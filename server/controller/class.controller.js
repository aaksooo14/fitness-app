const Class = require("../model/classess.model");
const fs = require("fs");

const addClass = async (req, res) => {
    try {
        const { name, description, schedule, createdBy } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Workout PDF is required" });
        }

        const parsedSchedule = typeof schedule === "string" ? JSON.parse(schedule) : schedule;

        const newClass = new Class({
            name,
            description,
            schedule: parsedSchedule,
            workoutPdf: `/uploads/workouts/${req.file.filename}`,
            createdBy,
        });

        const saved = await newClass.save();
        res.status(201).json({ message: "Class added successfully", data: saved });
    } catch (error) {
        console.error("Add class error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json({ classes });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch classes", error: err.message });
    }
};

const updateClass = async (req, res) => {
    try {
        const classId = req.params.id;
        const { name } = req.body;

        const existingClass = await Class.findById(classId);
        if (!existingClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Update fields
        if (name) existingClass.name = name;

        if (req.file) {
            // Optional: remove old file from disk
            if (existingClass.workoutPdf) {
                const oldPath = path.join(__dirname, "..", "uploads", existingClass.workoutPdf);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }

            existingClass.workoutPdf = req.file.filename;
        }

        const updatedClass = await existingClass.save();
        res.status(200).json({ message: "Class updated", updatedCourse: updatedClass });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};
const deleteClass = async (req, res) => {
    try {
        const classId = req.params.id;
        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({ message: "Class not found" });
        }

        // Optional: remove associated PDF file
        if (deletedClass.workoutPdf) {
            const filePath = path.join(__dirname, "..", "uploads", deletedClass.workoutPdf);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.status(200).json({ message: "Class deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
};

module.exports = {
    addClass,
    getAllClasses,
    updateClass,
    deleteClass
};
