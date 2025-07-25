const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    number: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/, // ensures 10-digit phone number
    },

    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member",
    },

    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class' // reference to the Class model
    }]

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
