import React from "react";
import PortalLayout from "../components/PortalLayout";

function Dashboard({ role }) {

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const name =
        user.name ||
        (role === "student"
            ? "Student"
            : role === "instructor"
            ? "Instructor"
            : "Administrator");

    const isStudent = role === "student";
    const isInstructor = role === "instructor";
    const isAdmin = role === "admin";

    return (
        <PortalLayout role={role}>

            <div className="dashboard-page">

                <div className="dashboard-header">

                    <div>
                        <h1>
                            {isStudent
                                ? "Student Dashboard"
                                : isInstructor
                                ? "Instructor Dashboard"
                                : "Admin Dashboard"}
                        </h1>

                        <p>
                            Welcome back, {name}! Here's what's
                            happening in Learn Pool.
                        </p>
                    </div>

                    <button className="outline-button">
                        ↻ Refresh
                    </button>

                </div>

                {/* STATISTICS */}

                <div className="stats-grid">

                    {isStudent && (
                        <>
                            <div className="stat-card blue">
                                <span className="stat-icon">
                                    ▣
                                </span>

                                <div>
                                    <h3>My Courses</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card purple">
                                <span className="stat-icon">
                                    ☷
                                </span>

                                <div>
                                    <h3>Assignments</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card cyan">
                                <span className="stat-icon">
                                    ▣
                                </span>

                                <div>
                                    <h3>Live Classes</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card green">
                                <span className="stat-icon">
                                    ◇
                                </span>

                                <div>
                                    <h3>Certificates</h3>
                                    <strong>0</strong>
                                </div>
                            </div>
                        </>
                    )}

                    {isInstructor && (
                        <>
                            <div className="stat-card blue">
                                <span className="stat-icon">▣</span>
                                <div>
                                    <h3>Courses</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card purple">
                                <span className="stat-icon">♙</span>
                                <div>
                                    <h3>Students</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card cyan">
                                <span className="stat-icon">▣</span>
                                <div>
                                    <h3>Classes</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card green">
                                <span className="stat-icon">☷</span>
                                <div>
                                    <h3>Assignments</h3>
                                    <strong>0</strong>
                                </div>
                            </div>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <div className="stat-card blue">
                                <span className="stat-icon">♙</span>
                                <div>
                                    <h3>Users</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card purple">
                                <span className="stat-icon">▣</span>
                                <div>
                                    <h3>Courses</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card cyan">
                                <span className="stat-icon">☷</span>
                                <div>
                                    <h3>Enrollments</h3>
                                    <strong>0</strong>
                                </div>
                            </div>

                            <div className="stat-card green">
                                <span className="stat-icon">▥</span>
                                <div>
                                    <h3>Reports</h3>
                                    <strong>0</strong>
                                </div>
                            </div>
                        </>
                    )}

                </div>

                {/* QUICK ACCESS */}

                <section className="dashboard-section">

                    <div className="section-heading">
                        <div>
                            <h2>Quick Access</h2>
                            <p>
                                Access your most important
                                Learn Pool features.
                            </p>
                        </div>
                    </div>

                    <div className="quick-grid">

                        {isStudent && (
                            <>
                                <QuickCard
                                    icon="▣"
                                    title="My Courses"
                                    description="View your enrolled courses"
                                />

                                <QuickCard
                                    icon="☷"
                                    title="Assignments"
                                    description="View and submit assignments"
                                />

                                <QuickCard
                                    icon="▣"
                                    title="Classroom"
                                    description="Join your live classes"
                                />

                                <QuickCard
                                    icon="▰"
                                    title="Files"
                                    description="Access course materials"
                                />
                            </>
                        )}

                        {isInstructor && (
                            <>
                                <QuickCard
                                    icon="▣"
                                    title="Courses"
                                    description="Manage your courses"
                                />

                                <QuickCard
                                    icon="♙"
                                    title="Students"
                                    description="View enrolled students"
                                />

                                <QuickCard
                                    icon="▣"
                                    title="Classes"
                                    description="Schedule classes"
                                />

                                <QuickCard
                                    icon="☷"
                                    title="Assignments"
                                    description="Create and grade assignments"
                                />
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <QuickCard
                                    icon="♙"
                                    title="Users"
                                    description="Manage platform users"
                                />

                                <QuickCard
                                    icon="▣"
                                    title="Courses"
                                    description="Manage all courses"
                                />

                                <QuickCard
                                    icon="☷"
                                    title="Enrollments"
                                    description="Manage course enrollments"
                                />

                                <QuickCard
                                    icon="⚙"
                                    title="System Settings"
                                    description="Configure Learn Pool"
                                />
                            </>
                        )}

                    </div>

                </section>

                {/* RECENT ACTIVITY */}

                <section className="dashboard-section">

                    <div className="section-heading">
                        <h2>Recent Activity</h2>
                    </div>

                    <div className="empty-card small-empty">

                        <div className="empty-icon">
                            ◷
                        </div>

                        <h2>No Recent Activity</h2>

                        <p>
                            Your recent activities will
                            appear here.
                        </p>

                    </div>

                </section>

            </div>

        </PortalLayout>
    );
}

function QuickCard({
    icon,
    title,
    description
}) {

    return (
        <div className="quick-card">

            <div className="quick-icon">
                {icon}
            </div>

            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <span className="arrow">
                →
            </span>

        </div>
    );
}

export default Dashboard;