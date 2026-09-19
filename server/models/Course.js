const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        duration: {
            type: String
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Course", courseSchema);