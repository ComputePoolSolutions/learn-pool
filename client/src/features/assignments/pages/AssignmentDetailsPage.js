import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import PortalLayout
    from "../../../components/PortalLayout";

import useAssignment
    from "../hooks/useAssignment";

import AssignmentStatus
    from "../components/AssignmentStatus";

const AssignmentDetailsPage = () => {

    const { assignmentId } = useParams();

    const navigate = useNavigate();

    const {
        assignment,
        loading,
        error
    } = useAssignment(assignmentId);

    if (loading) {
        return (
            <PortalLayout role="student">
                <div className="assignment-page">
                    Loading assignment...
                </div>
            </PortalLayout>
        );
    }

    if (error) {
        return (
            <PortalLayout role="student">
                <div className="assignment-page">
                    <div className="class-form-error">
                        {error}
                    </div>
                </div>
            </PortalLayout>
        );
    }

    if (!assignment) {
        return (
            <PortalLayout role="student">
                <div className="assignment-page">
                    Assignment not found.
                </div>
            </PortalLayout>
        );
    }

    const data =
        assignment.assignment ||
        assignment;

    const submission =
        assignment.submission ||
        data.submission ||
        null;

    return (
        <PortalLayout role="student">

            <div className="assignment-page">

                <div className="assignment-page-header">

                    <div>
                        <h1>
                            {data.title}
                        </h1>

                        <p>
                            {data.courseId?.title ||
                                "Course"}
                        </p>
                    </div>

                    <button
                        className="primary-button"
                        onClick={() =>
                            navigate(
                                `/student/assignments/${assignmentId}/submit`
                            )
                        }
                    >
                        {submission
                            ? "View Submission"
                            : "Submit Assignment"}
                    </button>

                </div>


                <div className="assignment-card">

                    <div className="assignment-card-content">

                        <h2>
                            Instructions
                        </h2>

                        <p>
                            {data.details}
                        </p>


                        <div className="assignment-details-grid">

                            <div>
                                <strong>
                                    Course
                                </strong>

                                <p>
                                    {data.courseId?.title ||
                                        "N/A"}
                                </p>
                            </div>


                            <div>
                                <strong>
                                    Instructor
                                </strong>

                                <p>
                                    {data.createdBy?.name ||
                                        "N/A"}
                                </p>
                            </div>


                            <div>
                                <strong>
                                    Due Date
                                </strong>

                                <p>
                                    {data.dueDate
                                        ? new Date(
                                            data.dueDate
                                        ).toLocaleString(
                                            "en-IN"
                                        )
                                        : "N/A"}
                                </p>
                            </div>


                            <div>
                                <strong>
                                    Maximum Score
                                </strong>

                                <p>
                                    {data.maxScore}
                                </p>
                            </div>

                        </div>


                        <div className="assignment-submission-summary">

                            <h2>
                                Submission
                            </h2>

                            {submission ? (

                                <>
                                    <AssignmentStatus
                                        assignment={data}
                                        submissionStatus={
                                            submission.status
                                        }
                                    />

                                    {submission.score !==
                                        null && (
                                        <p>
                                            Score:{" "}
                                            <strong>
                                                {
                                                    submission.score
                                                }
                                                /
                                                {
                                                    data.maxScore
                                                }
                                            </strong>
                                        </p>
                                    )}

                                    {submission.feedback && (
                                        <p>
                                            Feedback:{" "}
                                            {
                                                submission.feedback
                                            }
                                        </p>
                                    )}
                                </>

                            ) : (

                                <p>
                                    You have not
                                    submitted this
                                    assignment yet.
                                </p>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </PortalLayout>
    );
};

export default AssignmentDetailsPage;