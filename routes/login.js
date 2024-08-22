const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../mongoose.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email: email });

        if (!checkUser) {
            return res.status(404).json("Error: User Not Found");
        }
        const checkPassword = await bcrypt.compare(
            password,
            checkUser.passwordHash
        );
        if (!checkPassword) {
            return res
                .status(403)
                .json("Error: User email or password is incorrect");
        }
        const authToken = jwt.sign(
            { userObjectId: checkUser._id },
            process.env.JWT_SECRET
        );
        res.status(202).json(authToken);
    } catch (err) {
        res.status(401).json(err.message);
    }
});

module.exports = router;
