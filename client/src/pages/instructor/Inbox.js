import StudentLayout from "../../components/StudentLayout";

function Inbox() {

    return (
        <StudentLayout role="instructor">

            <div className="page-header">

                <h1 className="page-title">
                    Inbox
                </h1>

                <div className="header-buttons">

                    <button className="primary-button">
                        ✎ Compose
                    </button>

                    <button className="secondary-button">
                        ⟳ Refresh
                    </button>

                </div>

            </div>

            <div className="card-grid">

                <div className="stat-card">
                    <div className="stat-icon">📥</div>
                    <div className="stat-number">0</div>
                    <div className="stat-label">
                        Total Messages
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✉</div>
                    <div className="stat-number">0</div>
                    <div className="stat-label">
                        Unread
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📨</div>
                    <div className="stat-number">0</div>
                    <div className="stat-label">
                        Received
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">➤</div>
                    <div className="stat-number">0</div>
                    <div className="stat-label">
                        Sent
                    </div>
                </div>

            </div>

            <div className="section-card">

                <div className="section-header">
                    ✉ Messages
                </div>

                <div className="empty-state">

                    <div className="empty-icon">
                        ✉
                    </div>

                    <h3>
                        No Messages Found
                    </h3>

                    <p>
                        Your inbox is empty.
                    </p>

                </div>

            </div>

        </StudentLayout>
    );
}

export default Inbox;