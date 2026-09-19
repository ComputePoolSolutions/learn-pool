import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentAssignments.css";

const Assignments = () => {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("due");
  const [loading, setLoading] = useState(false);

  const loadAssignments = () => {
    setLoading(true);

    setTimeout(() => {
      setAssignments([]);
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredAssignments = assignments
    .filter((assignment) =>
      assignment.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      }

      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  return (
    <div className="learnpool-page">

      {/* TOP BAR */}
      <header className="topbar">

        <div className="logo">
          LearnPool
        </div>

        <input
          className="global-search"
          type="text"
          placeholder="Search courses, assignments, and more..."
        />

        <button className="signout-btn" onClick={logout}>
          🚪 Sign out
        </button>

      </header>

      <div className="main-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">

          {/* PROFILE */}
          <div className="profile-section">

            <div className="profile-circle">
              👨🏻
            </div>

            <div className="profile-name">
              Demo User
            </div>

            <div className="profile-username">
              @demo
            </div>

          </div>

          {/* MENU */}
          <nav className="sidebar-menu">

            <button
              className="sidebar-item"
              onClick={() => navigate("/student/dashboard")}
            >
              <span>🏠</span>
              <span>Dashboard</span>
            </button>

            <button
              className="sidebar-item active"
              onClick={() => navigate("/student/assignments")}
            >
              <span>☷</span>
              <span>Assignments</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/student/reports")}
            >
              <span>📊</span>
              <span>Reports</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/student/files")}
            >
              <span>📁</span>
              <span>File Storage</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/student/inbox")}
            >
              <span>✉</span>
              <span>Inbox</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/student/classroom")}
            >
              <span>👥</span>
              <span>Classroom</span>
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/student/settings")}
            >
              <span>⚙</span>
              <span>Settings</span>
            </button>

          </nav>

        </aside>

        {/* MAIN CONTENT */}
        <main className="content">

          {/* PAGE TITLE */}
          <div className="page-title-row">
            <h1>Assignments</h1>

            <button
              className="refresh-btn"
              onClick={loadAssignments}
              disabled={loading}
            >
              🔄 {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <div className="content-line"></div>

          {/* OVERVIEW CARD */}
          <section className="overview-card">

            <h2>
              ☷ <span>All Assignments Overview</span>
            </h2>

            <p>
              Click on an assignment to view details and submit your work.
            </p>

          </section>

          {/* SEARCH + SORT */}
          <div className="filters">

            <div className="assignment-search">

              <span>🔍</span>

              <input
                type="text"
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sort-select"
            >
              <option value="due">Sort by Due Date</option>
              <option value="title">Sort by Title</option>
            </select>

          </div>

          {/* ASSIGNMENTS CARD */}
          <section className="all-assignments-card">

            <h2>
              ☷ <span>All Assignments</span>
            </h2>

            {loading ? (

              <div className="empty-area">

                <div className="loading-spinner"></div>

                <h3>Loading assignments...</h3>

              </div>

            ) : filteredAssignments.length === 0 ? (

              <div className="empty-area">

                <div className="empty-icon">
                  📄✏️
                </div>

                <h3>No Assignments Found</h3>

                <p>
                  No assignments found in the system.
                </p>

              </div>

            ) : (

              <div className="assignment-list">

                {filteredAssignments.map((assignment) => (

                  <div
                    className="assignment-item"
                    key={assignment.id}
                  >

                    <div>

                      <h3>{assignment.title}</h3>

                      <p>{assignment.description}</p>

                      <span>
                        Due: {assignment.dueDate}
                      </span>

                    </div>

                    <button
                      onClick={() =>
                        alert(`Opening ${assignment.title}`)
                      }
                    >
                      View Assignment
                    </button>

                  </div>

                ))}

              </div>

            )}

          </section>

        </main>

      </div>

    </div>
  );
};

export default Assignments;