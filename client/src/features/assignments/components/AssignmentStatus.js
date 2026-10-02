import React from "react";

const AssignmentStatus = ({
    assignment,
    submissionStatus = "not_started"
}) => {

    const assignmentStatus =
        assignment?.status || "published";

    const getStatusText = () => {

        if (submissionStatus === "graded") {
            return "Graded";
        }

        if (submissionStatus === "late") {
            return "Submitted Late";
        }

        if (submissionStatus === "submitted") {
            return "Submitted";
        }

        if (submissionStatus === "pending") {
            return "Pending";
        }

        if (assignmentStatus === "closed") {
            return "Closed";
        }

        if (assignmentStatus === "draft") {
            return "Draft";
        }

        return "Not Started";
    };


    const getStatusClass = () => {

        if (submissionStatus === "graded") {
            return "assignment-status graded";
        }

        if (submissionStatus === "late") {
            return "assignment-status late";
        }

        if (submissionStatus === "submitted") {
            return "assignment-status submitted";
        }

        if (submissionStatus === "pending") {
            return "assignment-status pending";
        }

        if (assignmentStatus === "closed") {
            return "assignment-status closed";
        }

        if (assignmentStatus === "draft") {
            return "assignment-status draft";
        }

        return "assignment-status not-started";
    };


    return (
        <span className={getStatusClass()}>
            {getStatusText()}
        </span>
    );
};

export default AssignmentStatus;