const express = require("express");
const Class = require("../models/Class");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
    res.json({
        message: "Class route is working"
    });
});

// GET all classes
router.get("/", async (req, res) => {
    try {
        const classes = await Class.find()
            .populate("courseId", "title")
            .populate("instructorId", "name email")
            .sort({ startTime: 1 });

        res.status(200).json(classes);

    } catch (error) {
        console.error("Get classes error:", error);

        res.status(500).json({
            message: "Failed to fetch classes"
        });
    }
});

// CREATE a class
router.post("/", async (req, res) => {
    try {
        const {
            title,
            courseId,
            instructorId,
            startTime,
            endTime,
            meetingLink,
            description,
            durationMinutes,
            maxParticipants
        } = req.body;

        // Required fields
        if (
            !title ||
            !courseId ||
            !instructorId ||
            !startTime ||
            !endTime
        ) {
            return res.status(400).json({
                message:
                    "Title, courseId, instructorId, startTime and endTime are required"
            });
        }

        // Convert dates
        const start = new Date(startTime);
        const end = new Date(endTime);

        // Validate dates
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({
                message: "Invalid startTime or endTime"
            });
        }

        // End must be after start
        if (end <= start) {
            return res.status(400).json({
                message: "End time must be after start time"
            });
        }

        // Create class
        const newClass = await Class.create({
            title,
            courseId,
            instructorId,
            startTime: start,
            endTime: end,
            meetingLink,
            description,
            durationMinutes,
            maxParticipants
        });

        // Return created class
        const populatedClass = await Class.findById(newClass._id)
            .populate("courseId", "title")
            .populate("instructorId", "name email");

        res.status(201).json({
            message: "Class created successfully",
            class: populatedClass
        });

    } catch (error) {
        console.error("Create class error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;