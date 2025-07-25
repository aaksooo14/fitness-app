const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

const app = express();

//routes
const userRoutes = require("./routes/user.routes");
const classRoutes = require("./routes/class.route")
const memberRoutes = require("./routes/member.route")


// Middleware
app.use(cors());
app.use(express.json()); // ✅ FIXED: called as function

// Database connection
mongoose.connect('mongodb://localhost:27017/fitness')
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.log({ message: error.message }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/user", userRoutes); // ✅ Will now work if user.controller exports a router

app.use("/api", classRoutes);
app.use("/api/member", memberRoutes);


// Start server
app.listen(5000, () => {
    console.log('Port running on server');
});
