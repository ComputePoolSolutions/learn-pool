const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

/*
=========================================================
TEST ROUTE
GET /api/assignments/test
=========================================================
*/

router.get("/test", (req, res) => {
    res.json({
        message: "Assignment route is working"
    });
});


/*
=========================================================
GET ALL ASSIGNMENTS
GET /api/assignments
=========================================================
*/

router.get("/", async (req, res) => {
    try {

        const assignments = await Assignment.find()
            .populate("courseId", "title")
            .populate("createdBy", "name email")
            .sort({ dueDate: 1 });

        res.status(200).json(assignments);

    } catch (error) {

        console.error("Get assignments error:", error);

        res.status(500).json({
            message: "Failed to fetch assignments"
        });
    }
});


/*
=========================================================
GET SINGLE ASSIGNMENT
GET /api/assignments/:assignmentId
=========================================================
*/

router.get("/:assignmentId", async (req, res) => {

    try {

        const assignment =
            await Assignment.findById(req.params.assignmentId)
                .populate("courseId", "title description")
                .populate("createdBy", "name email");

        if (!assignment) {

            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.status(200).json({
            assignment
        });

    } catch (error) {

        console.error(
            "Get assignment error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch assignment"
        });
    }
});


/*
=========================================================
CREATE ASSIGNMENT
POST /api/assignments
=========================================================
*/

router.post("/", async (req, res) => {

    try {

        const {
            title,
            courseId,
            createdBy,
            details,
            dueDate,
            maxScore,
            status
        } = req.body;


        if (
            !title ||
            !courseId ||
            !createdBy ||
            !details ||
            !dueDate ||
            !maxScore
        ) {

            return res.status(400).json({
                message:
                    "title, courseId, createdBy, details, dueDate and maxScore are required"
            });
        }


        const assignment =
            await Assignment.create({

                title,
                courseId,
                createdBy,
                details,
                dueDate,
                maxScore,
                status: status || "draft"

            });


        const populatedAssignment =
            await Assignment.findById(
                assignment._id
            )
            .populate(
                "courseId",
                "title description"
            )
            .populate(
                "createdBy",
                "name email"
            );


        res.status(201).json({

            message:
                "Assignment created successfully",

            assignment:
                populatedAssignment

        });

    } catch (error) {

        console.error(
            "Create assignment error:",
            error
        );

        res.status(500).json({
            message: error.message
        });
    }
});
router.put("/:assignmentId", async (req, res) => {
    try {
        const {
            title,
            courseId,
            createdBy,
            details,
            dueDate,
            maxScore,
            status,
            attachmentIds
        } = req.body;

        const assignment = await Assignment.findById(
            req.params.assignmentId
        );

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        if (title !== undefined) {
            assignment.title = title;
        }

        if (courseId !== undefined) {
            assignment.courseId = courseId;
        }

        if (createdBy !== undefined) {
            assignment.createdBy = createdBy;
        }

        if (details !== undefined) {
            assignment.details = details;
        }

        if (dueDate !== undefined) {
            const newDueDate = new Date(dueDate);

            if (isNaN(newDueDate.getTime())) {
                return res.status(400).json({
                    message: "Invalid due date"
                });
            }

            assignment.dueDate = newDueDate;
        }

        if (maxScore !== undefined) {
            const numericMaxScore = Number(maxScore);

            if (
                Number.isNaN(numericMaxScore) ||
                !Number.isFinite(numericMaxScore) ||
                numericMaxScore <= 0
            ) {
                return res.status(400).json({
                    message: "Maximum score must be greater than 0"
                });
            }

            assignment.maxScore = numericMaxScore;
        }

        if (status !== undefined) {
            const allowedStatuses = [
                "draft",
                "published",
                "closed",
                "archived"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid assignment status"
                });
            }

            assignment.status = status;
        }

        if (attachmentIds !== undefined) {
            assignment.attachmentIds = attachmentIds;
        }

        await assignment.save();

        const updatedAssignment =
            await Assignment.findById(assignment._id)
                .populate("courseId", "title description")
                .populate("createdBy", "name email");

        res.status(200).json({
            message: "Assignment updated successfully",
            assignment: updatedAssignment
        });

    } catch (error) {
        console.error("Update assignment error:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
