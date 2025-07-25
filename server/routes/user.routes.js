
const express = require("express");
const { getAllMembers, registerUser } = require("../controller/user.controller"); // import from controller
const { loginUser } = require("../controller/login.controller");

const router = express.Router();

// Route to get all members
router.get("/members", getAllMembers);
router.post("/signup", registerUser);
router.post("/login", loginUser); //

module.exports = router;

