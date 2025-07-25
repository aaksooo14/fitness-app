const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

// @desc    Register new user
// @route   POST /api/user/signup
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, number } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            number
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllMembers = async (req, res) => {
    try {
        const members = await User.find({ role: "member" })
            .populate("enrolledClasses", "name") // populate course name only
            .select("name email enrolledClasses"); // select only required fields

        res.status(200).json({ members });
    } catch (error) {
        console.error("Fetch members error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = { registerUser, getAllMembers }
