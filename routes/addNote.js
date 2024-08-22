const express = require("express");
const mongoose = require("mongoose");
const { User, Note } = require("../mongoose");
const Auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", Auth, async (req, res) => {
    try {
        if (req.user) {
            const { note } = req.body;
            if (!note) {
                return res.status(400).json("Note required !");
            }
            const newNote = await Note.create({
                note: note,
                userObjectId: req.user.userObjectId,
                date: req.body.date
            });
            return res.json("The note has been successfully added");
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = router;
