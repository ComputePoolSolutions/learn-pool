import StudentLayout from "../../components/StudentLayout";

function Reports() {

    return (
        <StudentLayout role="instructor">

            <div className="page-header">

                <h1 className="page-title">
                    Reports
                </h1>

                <button className="secondary-button">
                    ⟳ Refresh
                </button>

            </div>

            <div className="section-card">

                <div className="section-header">
                    📊 Course Performance
                </div>

                <div className="section-body">

                    <table className="data-table">

                        <thead>

                            <tr>
                                <th>COURSE</th>
                                <th>STUDENTS</th>
                                <th>ASSIGNMENTS</th>
                                <th>AVG GRADE</th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr>
                                <td colSpan="4">
                                    No performance data available.
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

            <div className="section-card">

                <div className="section-header">
                    👥 Student Performance
                </div>

                <div className="empty-state">

                    <div className="empty-icon">
                        📊
                    </div>

                    <h3>
                        No Student Data
                    </h3>

                    <p>
                        Student performance reports will appear here.
                    </p>

                </div>

            </div>

        </StudentLayout>
    );
}

export default Reports;