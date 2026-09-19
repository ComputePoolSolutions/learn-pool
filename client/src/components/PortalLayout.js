import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PortalLayout.css";

function PortalLayout({ children, role = "student" }) {
    const location = useLocation();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};

    const userName =
        user.name ||
        (role === "instructor" ? "Instructor User" : "Demo User");

    const userEmail =
        user.email ||
        (role === "instructor"
            ? "@instructor"
            : "@demo");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const studentMenu = [
        {
            name: "Dashboard",
            icon: "🏠",
            path: "/student/dashboard"
        },
        {
            name: "My Courses",
            icon: "📚",
            path: "/student/courses"
        },
        {
            name: "Assignments",
            icon: "☷",
            path: "/student/assignments"
        },
        {
            name: "Reports",
            icon: "📊",
            path: "/student/reports"
        },
        {
            name: "File Storage",
            icon: "📁",
            path: "/student/files"
        },
        {
            name: "Inbox",
            icon: "✉",
            path: "/student/inbox"
        },
        {
            name: "Classroom",
            icon: "🖥",
            path: "/student/classroom"
        },
        {
            name: "Settings",
            icon: "⚙",
            path: "/student/settings"
        }
    ];

    const instructorMenu = [
        {
            name: "Dashboard",
            icon: "🏠",
            path: "/instructor/dashboard"
        },
        {
            name: "Assignments",
            icon: "☷",
            path: "/instructor/assignments"
        },
        {
            name: "Reports",
            icon: "📊",
            path: "/instructor/reports"
        },
        {
            name: "File Storage",
            icon: "📁",
            path: "/instructor/files"
        },
        {
            name: "Inbox",
            icon: "✉",
            path: "/instructor/inbox"
        },
        {
            name: "Classroom",
            icon: "🖥",
            path: "/instructor/classroom"
        },
        {
            name: "Settings",
            icon: "⚙",
            path: "/instructor/settings"
        }
    ];

    const menu =
        role === "instructor"
            ? instructorMenu
            : studentMenu;

    return (
        <div className="portal-container">

            {/* TOP BAR */}
            <header className="topbar">

                <div className="logo-section">
                    <img
                        src="/logo.png"
                        alt="LearnPool"
                        className="portal-logo"
                    />
                </div>

                <div className="search-section">

                    <input
                        type="text"
                        placeholder="Search courses, assignments, and more..."
                        className="top-search"
                    />

                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <span className="logout-icon">
                        ➜
                    </span>

                    Sign out
                </button>

            </header>


            {/* MAIN AREA */}
            <div className="portal-body">

                {/* SIDEBAR */}
                <aside className="sidebar">

                    <div className="profile-section">

                        <div className="avatar-circle">
                            <span className="avatar-person">
                                👨
                            </span>
                        </div>

                        <h3>
                            {userName}
                        </h3>

                        <p>
                            @{userEmail.replace("@", "").split("@")[0]}
                        </p>

                    </div>


                    {/* MENU */}
                    <nav className="side-menu">

                        {menu.map((item) => {

                            const active =
                                location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={
                                        active
                                            ? "menu-item active"
                                            : "menu-item"
                                    }
                                >

                                    <span className="menu-icon">
                                        {item.icon}
                                    </span>

                                    <span>
                                        {item.name}
                                    </span>

                                </Link>
                            );

                        })}

                    </nav>

                </aside>


                {/* CONTENT */}
                <main className="main-content">

                    {children}

                </main>

            </div>

        </div>
    );
}

export default PortalLayout;