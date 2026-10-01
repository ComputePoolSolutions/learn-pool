const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
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

        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        startTime: {
            type: Date,
            required: true
        },

        endTime: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: [
                "scheduled",
                "live",
                "completed",
                "cancelled"
            ],
            default: "scheduled"
        },

        meetingLink: {
            type: String,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        durationMinutes: {
            type: Number,
            min: 1
        },

        maxParticipants: {
            type: Number,
            min: 1,
            default: 50
        },

        currentParticipants: {
            type: Number,
            min: 0,
            default: 0
        },

        recordingUrl: {
            type: String,
            default: null
        },

        recordingPath: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Class", classSchema);