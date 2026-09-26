import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ role }) {
    const studentMenu = [
        {
            name: "Dashboard",
            path: "/student/dashboard",
            icon: "⌂"
        },
        {
            name: "My Courses",
            path: "/student/courses",
            icon: "▣"
        },
        {
            name: "Assignments",
            path: "/student/assignments",
            icon: "☷"
        },
        {
            name: "Classroom",
            path: "/student/classroom",
            icon: "▣"
        },
        {
            name: "Files",
            path: "/student/files",
            icon: "▰"
        },
        {
            name: "Inbox",
            path: "/student/inbox",
            icon: "✉"
        },
        {
            name: "Reports",
            path: "/student/reports",
            icon: "▥"
        },
        {
            name: "Settings",
            path: "/student/settings",
            icon: "⚙"
        },
        {
            name: "Certificates",
            path: "/student/certificates",
            icon: "◇"
        }
    ];

    const instructorMenu = [
        {
            name: "Dashboard",
            path: "/instructor/dashboard",
            icon: "⌂"
        },
        {
            name: "Courses",
            path: "/instructor/courses",
            icon: "▣"
        },
        {
            name: "Students",
            path: "/instructor/students",
            icon: "♙"
        },
        {
            name: "Classes",
            path: "/instructor/classroom",
            icon: "▣"
        },
        {
            name: "Assignments",
            path: "/instructor/assignments",
            icon: "☷"
        },
        {
            name: "Reports",
            path: "/instructor/reports",
            icon: "▥"
        },
        {
            name: "Messages",
            path: "/instructor/inbox",
            icon: "✉"
        },
        {
            name: "Settings",
            path: "/instructor/settings",
            icon: "⚙"
        }
    ];

    const adminMenu = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: "⌂"
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: "♙"
        },
        {
            name: "Roles",
            path: "/admin/roles",
            icon: "◆"
        },
        {
            name: "Courses",
            path: "/admin/courses",
            icon: "▣"
        },
        {
            name: "Enrollments",
            path: "/admin/enrollments",
            icon: "☷"
        },
        {
            name: "Classes",
            path: "/admin/classes",
            icon: "▣"
        },
        {
            name: "Assignments",
            path: "/admin/assignments",
            icon: "☷"
        },
        {
            name: "Files",
            path: "/admin/files",
            icon: "▰"
        },
        {
            name: "Announcements",
            path: "/admin/announcements",
            icon: "!"
        },
        {
            name: "Reports",
            path: "/admin/reports",
            icon: "▥"
        },
        {
            name: "Certificates",
            path: "/admin/certificates",
            icon: "◇"
        },
        {
            name: "Audit Logs",
            path: "/admin/audit-logs",
            icon: "▤"
        },
        {
            name: "System Settings",
            path: "/admin/settings",
            icon: "⚙"
        }
    ];

    let menu = studentMenu;

    if (role === "instructor") {
        menu = instructorMenu;
    }

    if (role === "admin") {
        menu = adminMenu;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const displayName =
        user.name ||
        (role === "student"
            ? "Demo Student"
            : role === "instructor"
            ? "Demo Instructor"
            : "Administrator");

    return (
        <aside className="sidebar">

            <div className="profile-section">

                <div className="profile-avatar">
                    {displayName.charAt(0).toUpperCase()}
                </div>

                <div className="profile-name">
                    {displayName}
                </div>

                <div className="profile-role">
                    @{role || "user"}
                </div>

            </div>

            <nav className="sidebar-menu">

                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <span className="sidebar-icon">
                            {item.icon}
                        </span>

                        <span>
                            {item.name}
                        </span>
                    </NavLink>
                ))}

            </nav>

        </aside>
    );
}

export default Sidebar;