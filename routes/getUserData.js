const express = require("express");
const { User, Note } = require("../mongoose");
const Auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", Auth, async (req,res) => {
    if(!req.user) {
        return res.status(404).json("ERROR 404")
    }
    const getUserData = await User.findOne({_id: req.user.userObjectId}) 
    const getNotes = await Note.find({userObjectId: req.user.userObjectId})

    res.status(200).json([getUserData, getNotes])
})

module.exports = router