import StudentLayout from "../../components/StudentLayout";

function Files() {

    return (
        <StudentLayout role="instructor">

            <div className="page-header">

                <h1 className="page-title">
                    File Storage
                </h1>

                <div className="header-buttons">

                    <button className="primary-button">
                        ⬆ Upload File
                    </button>

                    <button className="secondary-button">
                        ⟳ Refresh
                    </button>

                </div>

            </div>

            <div className="card-grid">

                <div className="stat-card">
                    <div className="stat-icon">📄</div>
                    <div className="stat-number">0</div>
                    <div className="stat-label">
                        Total Files
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">💾</div>
                    <div className="stat-number">0 B</div>
                    <div className="stat-label">
                        Storage Used
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🔗</div>
                    <div className="stat-number">0</div>
                    <div className="stat-label">
                        Shared Files
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🏷️</div>
                    <div className="stat-number">0</div>
                    <div className="stat-label">
                        Categories
                    </div>
                </div>

            </div>

            <div className="section-card">

                <div className="section-header">
                    📁 My Files
                </div>

                <div className="empty-state">

                    <div className="empty-icon">
                        📂
                    </div>

                    <h3>
                        No Files Found
                    </h3>

                    <p>
                        Your file storage is empty.
                    </p>

                </div>

            </div>

        </StudentLayout>
    );
}

export default Files;