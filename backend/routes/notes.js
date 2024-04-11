const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

router.use(express.json());

// ROUTE 1: Get logged-in user details using GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
       const notes = await Note.find({ user: req.user.id });  
       res.json(notes);
   } catch (error) {
       console.error(error.message); 
       res.status(500).json({ error: 'Internal server error' });
   }
});

// ROUTE 2: Add a new note using POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        
        // If there are errors, return Bad Request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // If no errors, add a new note
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });
        
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
