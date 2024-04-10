const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.use(express.json()); // Middleware for body parser

router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, create a new user
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    })
    .then(user => res.json(user))
    .catch(err => {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Please enter a unique value for email' ,message:err.message});
    }); 
});

module.exports = router;
