const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // multer config
const { addClass, getAllClasses, updateClass, deleteClass } = require("../controller/class.controller");
const Class = require("../model/classess.model");

router.post("/add-class", upload.single("workoutPdf"), addClass);
router.get("/classes", getAllClasses);

// ✅ New routes
router.put("/update-class/:id", upload.single("workoutPdf"), updateClass);
router.delete("/delete-class/:id", deleteClass);

module.exports = router;
