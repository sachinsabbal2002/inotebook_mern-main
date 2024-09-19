const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');// note collecion chahiye jo new schema bante time banya tah 
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        //   if(!notes) return res.json("No note present yet ,Please add note")// return is mandatory
          res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
       
            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
// update karne k liye put requset ko  used karte hai 
// update karne k liye ham title,tag,description bhejeyge jo req,body se jaeeyga
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
// {:id = : ke baad v string param se liya ja skta hai isliye : likh dete hai }
router.put('/updatenote/:id', fetchuser, async (req, res) => {// fetchuser is middleware ehich help to detrime that user is log in
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object by taking data frome req.body if  presrnt
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated , by using id (id i s take from req.param.id)
        //and update it
        let note = await Note.findById(req.params.id);//(!note==empty_note) req.param.id ka matlab url me se id ko lega 
        if (!note) { return res.status(404).send("Not Found") } // note nhi mila to 

        if (note.user.toString() !== req.user.id) {// note me se user ki is ko match kara rahe hai rqe ke user id se 
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router