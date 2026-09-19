import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./StudentLayout.css";

const StudentLayout = () => {
  return (
    <div className="student-layout">

      <aside className="student-sidebar">

        <div className="student-profile">
          <div className="profile-avatar">
            <div className="avatar-head"></div>
            <div className="avatar-body"></div>
          </div>

          <h3>Demo User</h3>
          <p>@demo</p>
        </div>

        <nav className="student-nav">

          <NavLink to="/student/dashboard">
            <span>🏠</span>
            Dashboard
          </NavLink>

          <NavLink to="/student/courses">
            <span>📚</span>
            My Courses
          </NavLink>

          <NavLink to="/student/assignments">
            <span>☷</span>
            Assignments
          </NavLink>

          <NavLink to="/student/reports">
            <span>▤</span>
            Reports
          </NavLink>

          <NavLink to="/student/files">
            <span>📁</span>
            File Storage
          </NavLink>

          <NavLink to="/student/inbox">
            <span>✉</span>
            Inbox
          </NavLink>

          <NavLink to="/student/classroom">
            <span>👥</span>
            Classroom
          </NavLink>

          <NavLink to="/student/settings">
            <span>⚙</span>
            Settings
          </NavLink>

        </nav>

      </aside>

      <main className="student-main">
        <Outlet />
      </main>

    </div>
  );
};

export default StudentLayout;