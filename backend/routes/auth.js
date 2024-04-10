const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const JWT_SECRET ="satyajits_secret_key"

router.use(express.json()); // Middleware for body parser

// Create a user using POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    // If there are errors, return Bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if a user with this email already exists
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }

//adding salt to password (npm package bcryptjs)
const salt = await bcrypt.genSalt(10); // Generate salt
        const secpass = await bcrypt.hash(req.body.password, salt);

        // If the user does not exist, create a new user
        user = await User.create({
            name: req.body.name,
            password:secpass,
            email: req.body.email,
        });

//using jwt token 
const data ={user:{id:user.id}}

const authtoken =jwt.sign(data,JWT_SECRET);
console.log(authtoken)
res.json({authtoken})


        // Success response
        // res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'some error occured' });
m 
        // res.status(500).json({ error: 'Please enter a unique value for email' });
    }
});

module.exports = router;
