import { Link, useLocation } from "react-router-dom";

function Sidebar({ role }) {

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path
            ? "sidebar-item active"
            : "sidebar-item";
    };

    const studentMenu = [
        {
            name: "Dashboard",
            icon: "🏠",
            path: "/student/dashboard"
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
            icon: "👥",
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
            icon: "👥",
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

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    return (
        <aside className="sidebar">

            <div className="profile-section">

                <img
                    src="/avatar.png"
                    alt="Profile"
                    className="profile-image"
                />

                <div className="profile-name">
                    {user.name ||
                        (role === "instructor"
                            ? "Instructor User"
                            : "Demo User")}
                </div>

                <div className="profile-username">
                    @{user.email
                        ? user.email.split("@")[0]
                        : role === "instructor"
                            ? "instructor"
                            : "demo"}
                </div>

            </div>

            <div className="sidebar-menu">

                {menu.map((item) => (

                    <Link
                        key={item.path}
                        to={item.path}
                        className={isActive(item.path)}
                    >

                        <span className="sidebar-icon">
                            {item.icon}
                        </span>

                        <span>
                            {item.name}
                        </span>

                    </Link>

                ))}

            </div>

        </aside>
    );
}

export default Sidebar;