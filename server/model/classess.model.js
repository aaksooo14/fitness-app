const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    workoutPdf: {
        type: String, // store the file path or full URL to the uploaded PDF
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // references admin user
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);
