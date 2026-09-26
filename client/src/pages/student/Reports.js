import React from "react";

function Reports() {
    return (
        <div className="reports-page">

            {/* =========================
                PAGE HEADER
            ========================= */}
            <div className="reports-header">

                <div>
                    <h1>Reports & Analytics</h1>
                </div>

                <button className="reports-refresh-btn">
                    ↻ Refresh
                </button>

            </div>


            {/* =========================
                STATISTICS
            ========================= */}
            <div className="reports-stats">

                {/* TOTAL COURSES */}
                <div className="report-stat-card blue-stat">

                    <div className="stat-number">
                        0
                    </div>

                    <div className="stat-label">
                        TOTAL COURSES
                    </div>

                </div>


                {/* TOTAL ASSIGNMENTS */}
                <div className="report-stat-card green-stat">

                    <div className="stat-number">
                        0
                    </div>

                    <div className="stat-label">
                        TOTAL ASSIGNMENTS
                    </div>

                </div>


                {/* TOTAL POINTS */}
                <div className="report-stat-card yellow-stat">

                    <div className="stat-number">
                        0
                    </div>

                    <div className="stat-label">
                        TOTAL POINTS
                    </div>

                </div>

            </div>


            {/* =========================
                ASSIGNMENT + GRADE
            ========================= */}
            <div className="reports-two-column">

                {/* ASSIGNMENT STATUS */}
                <div className="report-panel">

                    <div className="report-panel-header">
                        <span>☷</span>
                        Assignment Status
                    </div>

                    <div className="assignment-chart">

                        <div className="empty-report-message">
                            No assignment data available
                        </div>

                    </div>

                </div>


                {/* GRADE DISTRIBUTION */}
                <div className="report-panel">

                    <div className="report-panel-header">
                        <span>▤</span>
                        Grade Distribution
                    </div>

                    <div className="grade-chart">

                        <div className="chart-y-axis">
                            <span>10</span>
                            <span>9</span>
                            <span>8</span>
                            <span>7</span>
                            <span>6</span>
                            <span>5</span>
                            <span>4</span>
                            <span>3</span>
                            <span>2</span>
                            <span>1</span>
                            <span>0</span>
                        </div>

                        <div className="chart-area">

                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>
                            <div className="horizontal-line"></div>

                            <div className="vertical-lines">

                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                        </div>

                        <div className="chart-x-label">
                            Grade
                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                COURSE PERFORMANCE
            ========================= */}
            <div className="report-large-panel">

                <div className="report-panel-header">
                    <span>🎓</span>
                    Course Performance
                </div>

                <div className="course-table">

                    <div className="course-table-header">

                        <div>
                            COURSE
                        </div>

                        <div>
                            ASSIGNMENTS
                        </div>

                        <div>
                            AVG GRADE
                        </div>

                    </div>


                    <div className="course-table-empty">
                        No course performance data available
                    </div>

                </div>

            </div>


            {/* =========================
                STUDY STREAK
            ========================= */}
            <div className="report-large-panel">

                <div className="report-panel-header">
                    <span>🔥</span>
                    Study Streak
                </div>

                <div className="study-streak-box">

                    <div className="streak-number">
                        0
                    </div>

                    <div className="streak-label">
                        DAYS IN A ROW
                    </div>


                    <div className="streak-bottom">

                        <div className="streak-item">

                            <strong className="completed-number">
                                0
                            </strong>

                            <span>
                                Completed
                            </span>

                        </div>


                        <div className="streak-item">

                            <strong className="pending-number">
                                0
                            </strong>

                            <span>
                                Pending
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                DETAILED ANALYTICS
            ========================= */}
            <div className="report-large-panel">

                <div className="report-panel-header">
                    <span>◔</span>
                    Detailed Analytics
                </div>


                <div className="analytics-grid">

                    {/* LEARNING EFFICIENCY */}
                    <div className="analytics-item">

                        <div className="analytics-title">
                            🧠 Learning Efficiency
                        </div>

                        <div className="progress-background">

                            <div
                                className="progress-fill blue-progress"
                                style={{ width: "0%" }}
                            >
                            </div>

                        </div>

                        <div className="analytics-value">
                            0%
                        </div>

                    </div>


                    {/* ASSIGNMENT COMPLETION */}
                    <div className="analytics-item">

                        <div className="analytics-title">
                            ● Assignment Completion Rate
                        </div>

                        <div className="progress-background">

                            <div
                                className="progress-fill green-progress"
                                style={{ width: "0%" }}
                            >
                            </div>

                        </div>

                        <div className="analytics-value">
                            0%
                        </div>

                    </div>


                    {/* STUDY CONSISTENCY */}
                    <div className="analytics-item">

                        <div className="analytics-title">
                            📅 Study Consistency
                        </div>

                        <div className="progress-background">

                            <div
                                className="progress-fill orange-progress"
                                style={{ width: "0%" }}
                            >
                            </div>

                        </div>

                        <div className="analytics-value">
                            0%
                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}

export default Reports;