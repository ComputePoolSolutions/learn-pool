const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        details: {
            type: String,
            required: true,
            trim: true
        },

        dueDate: {
            type: Date,
            required: true
        },

        maxScore: {
            type: Number,
            required: true,
            min: 1
        },

        status: {
            type: String,
            enum: [
                "draft",
                "published",
                "closed",
                "archived"
            ],
            default: "draft"
        },

        attachmentIds: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Assignment",
    assignmentSchema
);