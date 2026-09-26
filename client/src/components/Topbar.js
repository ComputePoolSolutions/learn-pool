import React from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <header className="topbar">

            <div className="brand-area">

                <div className="brand-logo">
                    LP
                </div>

                <div className="brand-text">
                    <strong>LEARNPOOL</strong>
                    <span>by ComputePool Solutions</span>
                </div>

            </div>

            <div className="search-container">

                <span className="search-icon">
                    🔍
                </span>

                <input
                    type="text"
                    placeholder="Search courses, assignments, and more..."
                />

            </div>

            <div className="topbar-right">

                <span className="welcome-text">
                    {user.name || "User"}
                </span>

                <button
                    className="signout-button"
                    onClick={logout}
                >
                    ⇥ Sign out
                </button>

            </div>

        </header>
    );
}

export default Topbar;