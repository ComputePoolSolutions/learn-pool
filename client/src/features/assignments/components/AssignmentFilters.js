import React from "react";

import {
    ASSIGNMENT_FILTERS
} from "../assignment.types";


function AssignmentFilters({
    searchTerm = "",
    setSearchTerm,
    filter = ASSIGNMENT_FILTERS.ALL,
    setFilter
}) {

    const safeSearchTerm =
        typeof searchTerm === "string"
            ? searchTerm
            : "";


    const handleClear = () => {

        if (setSearchTerm) {
            setSearchTerm("");
        }

        if (setFilter) {
            setFilter(ASSIGNMENT_FILTERS.ALL);
        }

    };


    return (

        <div className="assignment-filters">

            {/* =================================================
               SEARCH
            ================================================= */}

            <div className="assignment-search">

                <span className="assignment-search-icon">
                    🔍
                </span>

                <input
                    type="text"
                    value={safeSearchTerm}
                    onChange={(event) => {

                        if (setSearchTerm) {
                            setSearchTerm(
                                event.target.value
                            );
                        }

                    }}
                    placeholder="Search assignments or courses..."
                />

            </div>


            {/* =================================================
               FILTER
            ================================================= */}

            <div className="assignment-filter-group">

                <label htmlFor="assignment-filter">
                    Filter
                </label>

                <select
                    id="assignment-filter"
                    value={filter}
                    onChange={(event) => {

                        if (setFilter) {
                            setFilter(
                                event.target.value
                            );
                        }

                    }}
                >

                    <option value={ASSIGNMENT_FILTERS.ALL}>
                        All
                    </option>

                    <option value={ASSIGNMENT_FILTERS.PENDING}>
                        Pending
                    </option>

                    <option value={ASSIGNMENT_FILTERS.DUE_SOON}>
                        Due Soon
                    </option>

                    <option value={ASSIGNMENT_FILTERS.SUBMITTED}>
                        Submitted
                    </option>

                    <option value={ASSIGNMENT_FILTERS.GRADED}>
                        Graded
                    </option>

                    <option value={ASSIGNMENT_FILTERS.OVERDUE}>
                        Overdue
                    </option>

                </select>

            </div>


            {/* =================================================
               CLEAR BUTTON
            ================================================= */}

            {(safeSearchTerm ||
                filter !== ASSIGNMENT_FILTERS.ALL) && (

                <button
                    type="button"
                    className="assignment-clear-button"
                    onClick={handleClear}
                >
                    Clear
                </button>

            )}

        </div>

    );

}


export default AssignmentFilters;