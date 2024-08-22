const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const {User} = require("../mongoose.js");

router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const checkEmail = await User.findOne({
            email: email,
        });
        if (checkEmail) {
            return res.status(401).json("Error: Email already in use");
        }
        const createUser = await User.create({
            name: name,
            email: email,
            passwordHash: await bcrypt.hash(password, 10),
        });
        if (createUser) {
            return res.status(201).json("Successfully created account");
        }
    } catch (err) {
        console.log(1)
        res.status(401).json(err.message);
    }
});

module.exports = router;
