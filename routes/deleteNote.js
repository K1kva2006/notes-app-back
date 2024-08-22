const express = require("express");
const { Note } = require("../mongoose");
const Auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", Auth, async (req, res) => {
    try{
        const deleteNote = await Note.findOneAndDelete({_id: req.body.noteId})
        if(!deleteNote) {
            return res.status(404).json("Note not found")
        }
        res.status(200).json("Note deleted successfully")
    } catch(err) {
        res.status(404).json(err)
    }
});

module.exports = router;
