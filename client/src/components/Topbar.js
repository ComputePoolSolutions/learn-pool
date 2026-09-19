import { useNavigate } from "react-router-dom";

function Topbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="topbar">

            <img
                src="/learnpool-logo.png"
                alt="LearnPool"
                className="logo"
            />

            <div className="search-container">

                <input
                    className="search-input"
                    type="text"
                    placeholder="Search courses, assignments, and more..."
                />

            </div>

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                🚪 Sign out
            </button>

        </div>
    );
}

export default Topbar;