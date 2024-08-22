const express = require("express");
const {User} = require("../mongoose.js");
const Auth = require("../middlewares/auth.js");
const router = express.Router();

router.get("/", Auth, async (req, res) => {
    try {
        if (req.user.userObjectId) {
            const getUser = await User.findOne({ _id: req.user.userObjectId });
            return res.status(200).json(getUser);
        } else {
            return res.status(400).json("Error: Need authorization token")
        }
        
    } catch (err) {
        res.status(404).json(err.message);
    }
});

module.exports = router;
