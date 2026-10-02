import React, { useMemo, useState } from "react";

import PortalLayout from "../../../components/PortalLayout";

import useAssignments from "../hooks/useAssignments";

import AssignmentStats from "../components/AssignmentStats";
import AssignmentFilters from "../components/AssignmentFilters";
import AssignmentList from "../components/AssignmentList";

import {
    ASSIGNMENT_FILTERS,
    SUBMISSION_STATUS
} from "../assignment.types";


function AssignmentsPage() {

    const {
        assignments,
        loading,
        error,
        reload
    } = useAssignments();


    const [searchTerm, setSearchTerm] = useState("");

    const [filter, setFilter] = useState(
        ASSIGNMENT_FILTERS.ALL
    );


    /* =========================================================
       FILTER ASSIGNMENTS
    ========================================================= */

    const filteredAssignments = useMemo(() => {

        const now = new Date();

        const dueSoonLimit = new Date(
            now.getTime() +
            3 * 24 * 60 * 60 * 1000
        );


        return assignments.filter((assignment) => {

            /* -------------------------------------------------
               SEARCH
            ------------------------------------------------- */

            const title =
                assignment.title || "";

            const courseName =
                assignment.courseId?.title ||
                assignment.course?.title ||
                "";

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();


            const matchesSearch =
                !search ||
                title
                    .toLowerCase()
                    .includes(search) ||
                courseName
                    .toLowerCase()
                    .includes(search);


            if (!matchesSearch) {
                return false;
            }


            /* -------------------------------------------------
               SUBMISSION STATUS
            ------------------------------------------------- */

            const submissionStatus =
                assignment.submissionStatus ||
                assignment.studentSubmissionStatus ||
                SUBMISSION_STATUS.NOT_STARTED;


            /* -------------------------------------------------
               DUE DATE
            ------------------------------------------------- */

            const dueDate =
                assignment.dueDate
                    ? new Date(assignment.dueDate)
                    : null;


            /* -------------------------------------------------
               OVERDUE
            ------------------------------------------------- */

            const isOverdue =
                dueDate &&
                dueDate < now &&
                submissionStatus !==
                    SUBMISSION_STATUS.SUBMITTED &&
                submissionStatus !==
                    SUBMISSION_STATUS.GRADED &&
                submissionStatus !==
                    SUBMISSION_STATUS.LATE;


            /* -------------------------------------------------
               DUE SOON
            ------------------------------------------------- */

            const isDueSoon =
                dueDate &&
                dueDate >= now &&
                dueDate <= dueSoonLimit;


            /* -------------------------------------------------
               FILTER
            ------------------------------------------------- */

            switch (filter) {

                case ASSIGNMENT_FILTERS.PENDING:

                    return (
                        submissionStatus ===
                            SUBMISSION_STATUS.NOT_STARTED ||
                        submissionStatus ===
                            SUBMISSION_STATUS.PENDING
                    );


                case ASSIGNMENT_FILTERS.DUE_SOON:

                    return Boolean(isDueSoon);


                case ASSIGNMENT_FILTERS.SUBMITTED:

                    return (
                        submissionStatus ===
                            SUBMISSION_STATUS.SUBMITTED ||
                        submissionStatus ===
                            SUBMISSION_STATUS.LATE
                    );


                case ASSIGNMENT_FILTERS.GRADED:

                    return (
                        submissionStatus ===
                        SUBMISSION_STATUS.GRADED
                    );


                case ASSIGNMENT_FILTERS.OVERDUE:

                    return Boolean(isOverdue);


                default:

                    /*
                     * "All" filter
                     *
                     * The default case handles:
                     * - all
                     * - unknown filter values
                     */

                    return true;
            }

        });

    }, [
        assignments,
        searchTerm,
        filter
    ]);


    /* =========================================================
       PAGE CONTENT
    ========================================================= */

    const assignmentContent = (

        <div className="assignment-page">

            {/* =================================================
               PAGE HEADER
            ================================================= */}

            <div className="assignment-page-header">

                <div>

                    <h1>
                        Assignments
                    </h1>

                    <p>
                        View, submit and track your assignments.
                    </p>

                </div>


                <button
                    className="assignment-refresh-button"
                    onClick={reload}
                    disabled={loading}
                >
                    ↻ Refresh
                </button>

            </div>


            {/* =================================================
               STATS
            ================================================= */}

            {!loading && !error && (

                <AssignmentStats
                    assignments={assignments}
                />

            )}


            {/* =================================================
               FILTERS
            ================================================= */}

            <AssignmentFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filter={filter}
                setFilter={setFilter}
            />


            {/* =================================================
               LOADING
            ================================================= */}

            {loading && (

                <div className="assignment-loading">

                    <div className="assignment-loading-spinner">
                        ⟳
                    </div>

                    <p>
                        Loading assignments...
                    </p>

                </div>

            )}


            {/* =================================================
               ERROR
            ================================================= */}

            {!loading && error && (

                <div className="assignment-error">

                    <div>

                        <strong>
                            Unable to load assignments
                        </strong>

                        <p>
                            {error}
                        </p>

                    </div>


                    <button
                        onClick={reload}
                        className="primary-button"
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* =================================================
               ASSIGNMENT LIST
            ================================================= */}

            {!loading && !error && (

                <section className="assignment-section">

                    <div className="assignment-section-header">

                        <div>

                            <h2>
                                My Assignments
                            </h2>

                            <p>
                                {filteredAssignments.length}{" "}
                                assignment
                                {filteredAssignments.length !== 1
                                    ? "s"
                                    : ""}
                            </p>

                        </div>

                    </div>


                    <AssignmentList
                        assignments={filteredAssignments}
                    />

                </section>

            )}

        </div>

    );


    /* =========================================================
       PORTAL LAYOUT
    ========================================================= */

    return (

        <PortalLayout role="student">

            {assignmentContent}

        </PortalLayout>

    );

}


export default AssignmentsPage;