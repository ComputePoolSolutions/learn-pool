import React from "react";


const AssignmentStats = ({
    assignments = []
}) => {

    const total =
        assignments.length;


    const pending =
        assignments.filter(
            (item) => {

                const status =
                    item.submissionStatus ||
                    item.studentSubmissionStatus ||
                    "not_started";

                return (
                    status === "not_started" ||
                    status === "pending"
                );

            }
        ).length;


    const submitted =
        assignments.filter(
            (item) => {

                const status =
                    item.submissionStatus ||
                    item.studentSubmissionStatus;

                return (
                    status === "submitted" ||
                    status === "late"
                );

            }
        ).length;


    const graded =
        assignments.filter(
            (item) => {

                const status =
                    item.submissionStatus ||
                    item.studentSubmissionStatus;

                return status === "graded";

            }
        ).length;


    const overdue =
        assignments.filter(
            (item) => {

                const status =
                    item.submissionStatus ||
                    item.studentSubmissionStatus ||
                    "not_started";

                if (
                    !item.dueDate ||
                    status === "submitted" ||
                    status === "graded"
                ) {
                    return false;
                }

                return (
                    new Date(item.dueDate) <
                    new Date()
                );

            }
        ).length;


    return (
        <div className="assignment-stats">

            <div className="assignment-stat-card">

                <div className="assignment-stat-icon">
                    📚
                </div>

                <div>
                    <span>
                        Total
                    </span>

                    <strong>
                        {total}
                    </strong>
                </div>

            </div>


            <div className="assignment-stat-card">

                <div className="assignment-stat-icon">
                    ⏳
                </div>

                <div>
                    <span>
                        Pending
                    </span>

                    <strong>
                        {pending}
                    </strong>
                </div>

            </div>


            <div className="assignment-stat-card">

                <div className="assignment-stat-icon">
                    📤
                </div>

                <div>
                    <span>
                        Submitted
                    </span>

                    <strong>
                        {submitted}
                    </strong>
                </div>

            </div>


            <div className="assignment-stat-card">

                <div className="assignment-stat-icon">
                    ✅
                </div>

                <div>
                    <span>
                        Graded
                    </span>

                    <strong>
                        {graded}
                    </strong>
                </div>

            </div>


            <div className="assignment-stat-card">

                <div className="assignment-stat-icon">
                    ⚠️
                </div>

                <div>
                    <span>
                        Overdue
                    </span>

                    <strong>
                        {overdue}
                    </strong>
                </div>

            </div>

        </div>
    );
};


export default AssignmentStats;