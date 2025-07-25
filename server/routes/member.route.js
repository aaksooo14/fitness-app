const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const User = require('../model/user.model');
const Class = require('../model/classess.model');

// GET /api/member/profile
router.get('/profile', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user._id).populate('enrolledClasses');
        res.status(200).json({
            name: user.name,
            email: user.email,
            enrolledClasses: user.enrolledClasses
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});

// POST /api/member/enroll
router.post('/enroll', auth, async (req, res) => {
    const { classId } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user.enrolledClasses.includes(classId)) {
            user.enrolledClasses.push(classId);
            await user.save();
        }

        res.status(200).json({ message: 'Enrolled successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error enrolling', error: err.message });
    }
});

//  POST /api/member/unenroll
router.post('/unenroll', auth, async (req, res) => {
    const { classId } = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.enrolledClasses = user.enrolledClasses.filter(
            id => id.toString() !== classId
        );
        await user.save();

        res.status(200).json({ message: 'Unenrolled successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error unenrolling', error: err.message });
    }
});

module.exports = router;
