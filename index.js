require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_CONNECTION_URL)
    .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY"))
    .catch((err) => console.log(err));

const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile")
const addNote = require("./routes/addNote")
const getUserData = require("./routes/getUserData")
const deleteNote = require("./routes/deleteNote")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/register", register);
app.use("/login", login);
app.use("/profile", profile)
app.use("/addNote", addNote)
app.use("/getUserData", getUserData)
app.use("/deleteNote", deleteNote)

const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
