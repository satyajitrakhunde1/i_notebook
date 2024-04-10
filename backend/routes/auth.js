const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const JWT_SECRET = "satyajits_secret_key";
const fetchuser =require('../middleware/fetchuser')

router.use(express.json()); // Middleware for body parser

//ROUTE 1 : Create a user using POST "/api/auth/createuser". No login required
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

        // Hash the password //adding salt 
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // If the user does not exist, create a new user
        user = await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
        });

        // Create and sign JWT token
        const tokenData = { user: { id: user.id } };
        const authToken = jwt.sign(tokenData, JWT_SECRET);
        res.json({ authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// ROUTE 2 :Authenticate a user using POST "/api/auth/login".
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // If there are errors, return Bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Create and sign JWT token
        const tokenData = { user: { id: user.id } };
        const authToken = jwt.sign(tokenData, JWT_SECRET);
        res.json({ authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// ROUTE 3 :get logged in user details  using POST "/api/auth/getuser".
router.post('/getuser',fetchuser,async (req,res)=>{

try {
    userId=req.user.id;
    const user =await User.findById(userId).select("-password")  //it will omit password (-password )means
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error")
    
}




})



module.exports = router;
