import StudentLayout from "../../components/StudentLayout";

function Assignments() {

    return (
        <StudentLayout role="instructor">

            <div className="page-header">

                <h1 className="page-title">
                    Assignments
                </h1>

                <div className="header-buttons">

                    <button className="primary-button">
                        + New Assignment
                    </button>

                    <button className="secondary-button">
                        ⟳ Refresh
                    </button>

                </div>

            </div>

            <p style={{
                fontSize: "18px",
                marginBottom: "25px"
            }}>
                Instructor View: All Assignments List
            </p>

            <div className="section-card">

                <div className="section-header">
                    ☷ All Assignments Overview
                </div>

                <div className="section-body">

                    <p style={{
                        fontSize: "18px"
                    }}>
                        Click on an assignment to view student submissions and grades.
                    </p>

                </div>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "25px",
                    marginBottom: "25px"
                }}
            >

                <input
                    className="form-input"
                    placeholder="🔍 Search assignments..."
                />

                <select className="form-select">

                    <option>
                        Sort by Due Date
                    </option>

                    <option>
                        Newest First
                    </option>

                    <option>
                        Oldest First
                    </option>

                </select>

            </div>

            <div className="section-card">

                <div className="section-header">
                    ☷ All Assignments
                </div>

                <div className="empty-state">

                    <div className="empty-icon">
                        📝
                    </div>

                    <h3>
                        No Assignments Found
                    </h3>

                    <p>
                        No assignments found in the system.
                    </p>

                    <button className="primary-button">
                        + Create First Assignment
                    </button>

                </div>

            </div>

        </StudentLayout>
    );
}

export default Assignments;