import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import PortalLayout from "./components/PortalLayout";
import FeaturePage from "./components/FeaturePage";

import "./App.css";
import "./styles.css";


function ProtectedRoute({ children, allowedRole }) {

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (
        allowedRole &&
        user.role !== allowedRole
    ) {
        if (user.role === "student") {
            return (
                <Navigate
                    to="/student/dashboard"
                    replace
                />
            );
        }

        if (user.role === "instructor") {
            return (
                <Navigate
                    to="/instructor/dashboard"
                    replace
                />
            );
        }

        if (user.role === "admin") {
            return (
                <Navigate
                    to="/admin/dashboard"
                    replace
                />
            );
        }

        return <Navigate to="/login" replace />;
    }

    return children;
}


/* ============================= */
/* FEATURE ROUTE HELPER */
/* ============================= */

function StudentFeature({
    title,
    subtitle,
    icon,
    buttonText
}) {

    return (
        <PortalLayout role="student">

            <FeaturePage
                title={title}
                subtitle={subtitle}
                icon={icon}
                buttonText={buttonText}
            />

        </PortalLayout>
    );
}


function InstructorFeature({
    title,
    subtitle,
    icon,
    buttonText
}) {

    return (
        <PortalLayout role="instructor">

            <FeaturePage
                title={title}
                subtitle={subtitle}
                icon={icon}
                buttonText={buttonText}
            />

        </PortalLayout>
    );
}


function AdminFeature({
    title,
    subtitle,
    icon,
    buttonText
}) {

    return (
        <PortalLayout role="admin">

            <FeaturePage
                title={title}
                subtitle={subtitle}
                icon={icon}
                buttonText={buttonText}
            />

        </PortalLayout>
    );
}


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ========================= */}
                {/* PUBLIC */}
                {/* ========================= */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ========================= */}
                {/* STUDENT */}
                {/* ========================= */}

                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <Dashboard role="student" />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/courses"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="My Courses"
                                subtitle="View and manage your enrolled courses"
                                icon="▣"
                                buttonText="Browse Courses"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/course/:id"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="Course Details"
                                subtitle="View classes, assignments, materials and progress"
                                icon="▣"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/assignments"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="Assignments"
                                subtitle="View, download and submit your assignments"
                                icon="☷"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/classroom"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="Virtual Classroom"
                                subtitle="Live, upcoming and completed classes"
                                icon="▣"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/files"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="File Storage"
                                subtitle="Access your course files and materials"
                                icon="▰"
                                buttonText="Upload File"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/inbox"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="Inbox"
                                subtitle="View messages and announcements"
                                icon="✉"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/reports"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="Reports"
                                subtitle="View your learning progress and performance"
                                icon="▥"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/settings"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="Settings"
                                subtitle="Manage your LearnPool account settings"
                                icon="⚙"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/certificates"
                    element={
                        <ProtectedRoute allowedRole="student">
                            <StudentFeature
                                title="Certificates"
                                subtitle="View and download your certificates"
                                icon="◇"
                            />
                        </ProtectedRoute>
                    }
                />


                {/* ========================= */}
                {/* INSTRUCTOR */}
                {/* ========================= */}

                <Route
                    path="/instructor/dashboard"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <Dashboard role="instructor" />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/instructor/courses"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorFeature
                                title="Courses"
                                subtitle="Manage your courses and enrolled students"
                                icon="▣"
                                buttonText="New Course"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/instructor/students"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorFeature
                                title="Students"
                                subtitle="View students enrolled in your courses"
                                icon="♙"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/instructor/classroom"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorFeature
                                title="Classroom"
                                subtitle="Create and manage live classes"
                                icon="▣"
                                buttonText="Create Class"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/instructor/assignments"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorFeature
                                title="Assignments"
                                subtitle="Create, publish, grade and provide feedback"
                                icon="☷"
                                buttonText="New Assignment"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/instructor/reports"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorFeature
                                title="Reports"
                                subtitle="View course and student performance reports"
                                icon="▥"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/instructor/inbox"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorFeature
                                title="Messages"
                                subtitle="Communicate with students and administrators"
                                icon="✉"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/instructor/settings"
                    element={
                        <ProtectedRoute allowedRole="instructor">
                            <InstructorFeature
                                title="Settings"
                                subtitle="Manage instructor account settings"
                                icon="⚙"
                            />
                        </ProtectedRoute>
                    }
                />


                {/* ========================= */}
                {/* ADMIN */}
                {/* ========================= */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Dashboard role="admin" />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Users"
                                subtitle="Manage all LearnPool users"
                                icon="♙"
                                buttonText="Add User"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/roles"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Roles"
                                subtitle="Manage user roles and permissions"
                                icon="◆"
                                buttonText="Create Role"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/courses"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Courses"
                                subtitle="Manage all courses"
                                icon="▣"
                                buttonText="Add Course"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/enrollments"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Enrollments"
                                subtitle="Manage student course enrollments"
                                icon="☷"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/classes"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Classes"
                                subtitle="Manage all scheduled classes"
                                icon="▣"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/assignments"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Assignments"
                                subtitle="Manage platform assignments"
                                icon="☷"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/files"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Files"
                                subtitle="Manage uploaded platform files"
                                icon="▰"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/announcements"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Announcements"
                                subtitle="Create and manage announcements"
                                icon="!"
                                buttonText="New Announcement"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/reports"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Reports"
                                subtitle="View platform reports and analytics"
                                icon="▥"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/certificates"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Certificates"
                                subtitle="Manage certificates"
                                icon="◇"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/audit-logs"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="Audit Logs"
                                subtitle="Track system activity"
                                icon="▤"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminFeature
                                title="System Settings"
                                subtitle="Configure LearnPool system settings"
                                icon="⚙"
                            />
                        </ProtectedRoute>
                    }
                />

                {/* FALLBACK */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;