import React from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
    const user = JSON.parse(localStorage.getItem("user")) || {
        name: "Demo User",
        email: "demo"
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div className="student-layout">

            {/* ================= TOP BAR ================= */}
            <header className="top-bar">

                <div className="logo-area">
                    <div className="logo-box">
                        <span className="logo-cap">🎓</span>
                        <div>
                            <strong>LEARNPOOL</strong>
                            <small>by ComputePool Solutions</small>
                        </div>
                    </div>
                </div>

                <div className="search-area">
                    <input
                        type="text"
                        placeholder="Search courses, assignments, and more..."
                    />
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    ↪ Sign out
                </button>

            </header>


            {/* ================= SIDEBAR ================= */}
            <aside className="student-sidebar">

                {/* Profile */}
                <div className="profile-section">

                    <div className="profile-image">
                        👨
                    </div>

                    <h3>
                        {user.name || "Demo User"}
                    </h3>

                    <p>
                        @{user.email ? user.email.split("@")[0] : "demo"}
                    </p>

                </div>


                {/* Menu */}
                <nav className="sidebar-menu">

                    <Link
                        to="/student/dashboard"
                        className="sidebar-item active"
                    >
                        <span className="menu-icon">⌂</span>
                        <span>Dashboard</span>
                    </Link>


                    <Link
                        to="/student/courses"
                        className="sidebar-item"
                    >
                        <span className="menu-icon">☷</span>
                        <span>My Courses</span>
                    </Link>


                    <Link
                        to="/student/assignments"
                        className="sidebar-item"
                    >
                        <span className="menu-icon">☑</span>
                        <span>Assignments</span>
                    </Link>


                    <Link
                        to="/student/reports"
                        className="sidebar-item"
                    >
                        <span className="menu-icon">▤</span>
                        <span>Reports</span>
                    </Link>


                    <Link
                        to="/student/files"
                        className="sidebar-item"
                    >
                        <span className="menu-icon">▰</span>
                        <span>File Storage</span>
                    </Link>


                    <Link
                        to="/student/inbox"
                        className="sidebar-item"
                    >
                        <span className="menu-icon">✉</span>
                        <span>Inbox</span>
                    </Link>


                    <Link
                        to="/student/classroom"
                        className="sidebar-item"
                    >
                        <span className="menu-icon">♧</span>
                        <span>Classroom</span>
                    </Link>


                    <Link
                        to="/student/settings"
                        className="sidebar-item"
                    >
                        <span className="menu-icon">⚙</span>
                        <span>Settings</span>
                    </Link>

                </nav>

            </aside>


            {/* ================= MAIN CONTENT ================= */}
            <main className="student-main">

                {/* Page Heading */}
                <div className="page-header">

                    <div>
                        <h1>Dashboard</h1>
                        <p>
                            Welcome back, {user.name || "Student"}!
                        </p>
                    </div>

                    <button className="refresh-button">
                        ⟳ Refresh
                    </button>

                </div>


                {/* ================= WELCOME CARD ================= */}
                <section className="welcome-card">

                    <div className="welcome-content">

                        <h2>
                            Welcome to LearnPool
                        </h2>

                        <p>
                            Continue your learning journey and stay
                            up to date with your courses.
                        </p>

                    </div>

                    <div className="welcome-icon">
                        🎓
                    </div>

                </section>


                {/* ================= STAT CARDS ================= */}
                <section className="dashboard-stats">

                    <div className="stat-card">

                        <div className="stat-icon blue">
                            📚
                        </div>

                        <div>
                            <h2>0</h2>
                            <p>My Courses</p>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon orange">
                            ☑
                        </div>

                        <div>
                            <h2>0</h2>
                            <p>Assignments</p>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon green">
                            ✓
                        </div>

                        <div>
                            <h2>0%</h2>
                            <p>Overall Progress</p>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon purple">
                            🏆
                        </div>

                        <div>
                            <h2>0</h2>
                            <p>Certificates</p>
                        </div>

                    </div>

                </section>


                {/* ================= MY COURSES ================= */}
                <section className="content-card">

                    <div className="card-header">

                        <div>
                            <h2>📚 My Courses</h2>
                            <p>
                                Courses you are currently enrolled in
                            </p>
                        </div>

                        <Link
                            to="/student/courses"
                            className="outline-button"
                        >
                            View All
                        </Link>

                    </div>


                    <div className="empty-content">

                        <div className="empty-icon">
                            📚
                        </div>

                        <h2>No Courses Found</h2>

                        <p>
                            You are not enrolled in any courses yet.
                        </p>

                        <Link
                            to="/student/courses"
                            className="primary-button"
                        >
                            + Browse Courses
                        </Link>

                    </div>

                </section>


                {/* ================= UPCOMING CLASSES ================= */}
                <section className="content-card">

                    <div className="card-header">

                        <div>
                            <h2>🎥 Upcoming Classes</h2>
                            <p>
                                Your upcoming live learning sessions
                            </p>
                        </div>

                        <Link
                            to="/student/classroom"
                            className="outline-button"
                        >
                            Classroom
                        </Link>

                    </div>


                    <div className="schedule-box">

                        <div className="schedule-title">
                            <span>📅</span>
                            <strong>Today's Schedule</strong>

                            <span className="date-badge">
                                Today
                            </span>
                        </div>


                        <div className="no-class">

                            <div className="calendar-icon">
                                📅
                            </div>

                            <h2>
                                No Classes Scheduled
                            </h2>

                            <p>
                                There are no classes scheduled for today.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= ASSIGNMENTS ================= */}
                <section className="content-card">

                    <div className="card-header">

                        <div>
                            <h2>☑ Assignments</h2>
                            <p>
                                Track your pending assignments
                            </p>
                        </div>

                        <Link
                            to="/student/assignments"
                            className="outline-button"
                        >
                            View Assignments
                        </Link>

                    </div>


                    <div className="assignment-empty">

                        <div className="assignment-icon">
                            ☑
                        </div>

                        <h2>
                            No Pending Assignments
                        </h2>

                        <p>
                            You don't have any pending assignments.
                        </p>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default StudentDashboard;