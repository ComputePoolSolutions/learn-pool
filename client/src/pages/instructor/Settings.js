import StudentLayout from "../../components/StudentLayout";

function Settings() {

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    return (
        <StudentLayout role="instructor">

            <div className="page-header">

                <h1 className="page-title">
                    Settings
                </h1>

                <button className="secondary-button">
                    ⬇ Export Data
                </button>

            </div>

            <div className="settings-layout">

                <div className="settings-menu">

                    <h2>
                        Settings Menu
                    </h2>

                    <div className="settings-option active">
                        👤 Profile
                    </div>

                    <div className="settings-option">
                        🛡️ Privacy
                    </div>

                    <div className="settings-option">
                        🔔 Notifications
                    </div>

                    <div className="settings-option">
                        ⚙ Account
                    </div>

                </div>

                <div className="profile-form">

                    <h2 style={{
                        marginBottom: "30px"
                    }}>
                        👤 Profile Settings
                    </h2>

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            className="form-input"
                            value={user.name || ""}
                            readOnly
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            className="form-input"
                            value={user.email || ""}
                            readOnly
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Bio
                        </label>

                        <textarea
                            className="form-textarea"
                            placeholder="Tell us about yourself..."
                        />

                    </div>

                    <button className="primary-button">
                        💾 Save Profile
                    </button>

                </div>

            </div>

        </StudentLayout>
    );
}

export default Settings;