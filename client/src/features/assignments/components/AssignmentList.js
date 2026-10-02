import React from "react";

import AssignmentCard from "./AssignmentCard";


const AssignmentList = ({
    assignments = []
}) => {

    if (assignments.length === 0) {

        return (
            <div className="assignment-empty">

                <div className="assignment-empty-icon">
                    📝
                </div>

                <h3>
                    No assignments found
                </h3>

                <p>
                    There are no assignments matching
                    your current filters.
                </p>

            </div>
        );

    }


    return (
        <div className="assignment-grid">

            {assignments.map(
                (assignment) => (

                    <AssignmentCard
                        key={
                            assignment._id ||
                            assignment.id
                        }
                        assignment={assignment}
                    />

                )
            )}

        </div>
    );
};


export default AssignmentList;