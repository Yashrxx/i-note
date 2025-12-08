const express = require('express')
const notes = express.Router();
const Note = require("../models/Notes")
const { body, validationResult } = require('express-validator');
const fetchUser = require("../middleware/fetchUser")
// Route 1 :Get all the notes using "/api/notes/fetchuser",Login required
notes.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route 2 :Get all the notes using "/api/notes/addnote",Login required
notes.post('/addnote', [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 charecters').isLength({ min: 5 })
], fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        // if errors return Bad request and respond errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const SavedNote = await note.save()
        res.json(SavedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// Route 3 :Update note using "/api/notes/updatenote",Login required
notes.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote={};
    try{
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Note not found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note})
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
// Route 4:Delete note using "/api/notes/deletenote",Login required
notes.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        let note=await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Note not found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success":"Note Deleted Successfully",note:note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = notes;