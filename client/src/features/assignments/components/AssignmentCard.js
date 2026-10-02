import React from "react";
import { useNavigate } from "react-router-dom";

import AssignmentStatus from "./AssignmentStatus";


const AssignmentCard = ({
    assignment
}) => {

    const navigate = useNavigate();


    /* =========================================================
       SUBMISSION STATUS
    ========================================================= */

    const submissionStatus =
        assignment?.submissionStatus ||
        assignment?.studentSubmissionStatus ||
        "not_started";


    /* =========================================================
       COURSE NAME
    ========================================================= */

    const course =
        assignment?.courseId?.title ||
        assignment?.course?.title ||
        "Course";


    /* =========================================================
       INSTRUCTOR NAME
    ========================================================= */

    const instructor =
        assignment?.createdBy?.name ||
        assignment?.instructor?.name ||
        "Instructor";


    /* =========================================================
       DUE DATE
    ========================================================= */

    const dueDate =
        assignment?.dueDate
            ? new Date(
                assignment.dueDate
            ).toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )
            : "No due date";


    /* =========================================================
       OVERDUE
    ========================================================= */

    const isOverdue =
        assignment?.dueDate &&
        new Date(assignment.dueDate) <
        new Date() &&
        submissionStatus !== "submitted" &&
        submissionStatus !== "graded" &&
        submissionStatus !== "late" &&
        assignment?.status === "published";


    /* =========================================================
       OPEN COURSE
    ========================================================= */

    const handleOpen = () => {

        const courseId =
            assignment?.courseId?._id ||
            assignment?.courseId?.id ||
            assignment?.courseId ||
            assignment?.course?._id ||
            assignment?.course?.id;


        /* COURSE ID NOT FOUND */

        if (!courseId) {

            console.error(
                "Course ID not found for assignment:",
                assignment
            );

            return;
        }


        /*
        ---------------------------------------------------------
        Navigate to Course Details
        ---------------------------------------------------------
        */

        navigate(
            `/student/courses/${courseId}`
        );

    };


    return (

        <div className="assignment-card">


            {/* =================================================
               CARD TOP
            ================================================= */}

            <div className="assignment-card-top">

                <div className="assignment-icon">
                    📝
                </div>


                <AssignmentStatus
                    assignment={assignment}
                    submissionStatus={
                        submissionStatus
                    }
                />

            </div>


            {/* =================================================
               CARD CONTENT
            ================================================= */}

            <div className="assignment-card-content">

                <h3>
                    {assignment.title}
                </h3>


                <p className="assignment-course">

                    📚 {course}

                </p>


                <p className="assignment-instructor">

                    👤 {instructor}

                </p>

            </div>


            {/* =================================================
               ASSIGNMENT INFORMATION
            ================================================= */}

            <div className="assignment-card-info">


                {/* DUE DATE */}

                <div>

                    <span>
                        Due Date
                    </span>


                    <strong
                        className={
                            isOverdue
                                ? "overdue-text"
                                : ""
                        }
                    >

                        {isOverdue
                            ? "Overdue"
                            : dueDate}

                    </strong>

                </div>


                {/* MAXIMUM SCORE */}

                <div>

                    <span>
                        Maximum Score
                    </span>


                    <strong>

                        {assignment.maxScore ?? 0}

                    </strong>

                </div>

            </div>


            {/* =================================================
               GRADE
            ================================================= */}

            {
                assignment.grade !== undefined &&
                assignment.grade !== null && (

                    <div className="assignment-grade-preview">

                        <span>
                            Grade
                        </span>


                        <strong>

                            {assignment.grade}


                            {
                                assignment.maxScore
                                    ? ` / ${assignment.maxScore}`
                                    : ""
                            }

                        </strong>

                    </div>

                )
            }


            {/* =================================================
               VIEW COURSE BUTTON
            ================================================= */}

            <button
                className="assignment-view-button"
                onClick={handleOpen}
            >

                View Course →

            </button>


        </div>

    );

};


export default AssignmentCard;