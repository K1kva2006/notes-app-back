const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minLength: [6, "Name is too short"],
        maxLength: [20, "Name is too long"],
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        minLength: [6, "Email is too short"],
        maxLength: [36, "Email is too long"],
        validate: {
            validator: async function (reqEmail) {
                const checkEmail = await this.constructor.findOne({
                    email: reqEmail,
                });
                return !checkEmail;
            },
            message: "Email address already in use",
        },
    },
    passwordHash: {
        type: String,
        required: [true, "Please provide Password"],
    },
});

const User = mongoose.model("User", userSchema);

const noteSchema = mongoose.Schema({
    note: {
        type: String,
        required: [true, "Please add note"],
        minLength: [6, "note is too short"],
        maxLength: [150, "note is too long"],
    },
    userObjectId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please add userObjectId"],
    },
    date: {
        type: String,
        required: true,
    }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = { User, Note };
