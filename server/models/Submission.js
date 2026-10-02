const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        assignmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
            required: true
        },

        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        submissionText: {
            type: String,
            default: "",
            trim: true
        },

        attachmentIds: {
            type: [String],
            default: []
        },

        submissionDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: [
                "pending",
                "submitted",
                "late",
                "graded"
            ],
            default: "pending"
        },

        score: {
            type: Number,
            default: null
        },

        percentage: {
            type: Number,
            default: null
        },

        feedback: {
            type: String,
            default: ""
        },

        gradedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        gradedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

submissionSchema.index(
    {
        assignmentId: 1,
        studentId: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model(
    "Submission",
    submissionSchema
);