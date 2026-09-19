const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

console.log("Course loaded:", typeof Course);
console.log("Course.find:", typeof Course.find);


// GET ALL ACTIVE COURSES
router.get("/", async (req, res) => {
    try {
        console.log("GET /api/courses called");
        console.log("Course.find inside route:", typeof Course.find);

        const courses = await Course.find({
            status: "active"
        });

        res.status(200).json(courses);

    } catch (error) {
        console.error("Get courses error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});


// CREATE COURSE
router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            instructorId,
            duration
        } = req.body;

        if (!title || !description || !instructorId) {
            return res.status(400).json({
                message: "Title, description and instructorId are required"
            });
        }

        const course = await Course.create({
            title,
            description,
            instructorId,
            duration
        });

        res.status(201).json({
            message: "Course created successfully",
            course
        });

    } catch (error) {
        console.error("Create course error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;