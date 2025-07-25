
require('dotenv').config(); // place this at the top of your entry file (e.g., index.js or app.js)
const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        // 3. Check for admin
        const isAdmin = email === "admin@gmail.com" && password === "admin@123";


        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 4. Create JWT token
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: isAdmin ? "admin" : "member" },
            process.env.JWT_SECRET,
        );

        // 5. Respond with token and user data
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                number: user.number,
                role: isAdmin ? "admin" : "member",
                redirect: isAdmin ? "/admin/dashboard" : "/member/dashboard"
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
