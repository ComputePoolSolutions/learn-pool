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

/* =========================================================
   CLASSROOM PAGES
========================================================= */

import StudentClassroom from "./pages/student/Classroom";
import ClassDetails from "./pages/student/ClassDetails";

import InstructorClassroom from "./pages/instructor/Classroom";
import CreateClass from "./pages/instructor/CreateClass";
import EditClass from "./pages/instructor/EditClass";

import AdminClasses from "./pages/admin/Classes";

/* =========================================================
   ASSIGNMENT PAGES
========================================================= */

import AssignmentsPage
    from "./features/assignments/pages/AssignmentsPage";

import AssignmentDetailsPage
    from "./features/assignments/pages/AssignmentDetailsPage";

import AssignmentSubmitPage
    from "./features/assignments/pages/AssignmentSubmitPage";

import "./App.css";
import "./styles.css";


/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({
    children,
    allowedRole
}) {

    const token =
        localStorage.getItem("token");

    let user = {};

    try {

        user = JSON.parse(
            localStorage.getItem("user") || "{}"
        );

    } catch (error) {

        user = {};

    }


    /* =====================================================
       USER NOT LOGGED IN
    ===================================================== */

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    /* =====================================================
       ROLE CHECK
    ===================================================== */

    if (
        allowedRole &&
        user.role !== allowedRole
    ) {

        if (
            user.role === "student"
        ) {

            return (
                <Navigate
                    to="/student/dashboard"
                    replace
                />
            );

        }


        if (
            user.role === "instructor"
        ) {

            return (
                <Navigate
                    to="/instructor/dashboard"
                    replace
                />
            );

        }


        if (
            user.role === "admin"
        ) {

            return (
                <Navigate
                    to="/admin/dashboard"
                    replace
                />
            );

        }


        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return children;
}


/* =========================================================
   STUDENT FEATURE
========================================================= */

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


/* =========================================================
   INSTRUCTOR FEATURE
========================================================= */

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


/* =========================================================
   ADMIN FEATURE
========================================================= */

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


/* =========================================================
   APP
========================================================= */

function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* =================================================
                   PUBLIC ROUTES
                ================================================= */}

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
                    element={
                        <Login />
                    }
                />


                <Route
                    path="/register"
                    element={
                        <Register />
                    }
                />


                {/* =================================================
                   STUDENT
                ================================================= */}


                {/* STUDENT DASHBOARD */}

                <Route
                    path="/student/dashboard"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <Dashboard
                                role="student"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT ASSIGNMENT DETAILS
                ================================================= */}

                <Route
                    path="/student/assignments/:assignmentId"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <AssignmentDetailsPage />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT ASSIGNMENT SUBMIT
                ================================================= */}

                <Route
                    path="/student/assignments/:assignmentId/submit"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <AssignmentSubmitPage />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   MY COURSES
                ================================================= */}

                <Route
                    path="/student/courses"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentFeature
                                title="My Courses"
                                subtitle="View and manage your enrolled courses"
                                icon="▣"
                                buttonText="Browse Courses"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   COURSE DETAILS
                   
                   IMPORTANT:
                   This route uses /student/courses/:id
                   so AssignmentCard can navigate here.
                ================================================= */}

                <Route
                    path="/student/courses/:id"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentFeature
                                title="Course Details"
                                subtitle="View classes, assignments, materials and progress"
                                icon="▣"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT ASSIGNMENTS
                ================================================= */}

                <Route
                    path="/student/assignments"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <AssignmentsPage />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT CLASSROOM
                ================================================= */}

                <Route
                    path="/student/classroom"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentClassroom />

                        </ProtectedRoute>

                    }
                />


                {/* SHORT CLASSROOM URL */}

                <Route
                    path="/classes"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentClassroom />

                        </ProtectedRoute>

                    }
                />


                {/* CLASS DETAILS */}

                <Route
                    path="/classes/:classId"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <ClassDetails />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT FILES
                ================================================= */}

                <Route
                    path="/student/files"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentFeature
                                title="File Storage"
                                subtitle="Access your course files and materials"
                                icon="▰"
                                buttonText="Upload File"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT INBOX
                ================================================= */}

                <Route
                    path="/student/inbox"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentFeature
                                title="Inbox"
                                subtitle="View messages and announcements"
                                icon="✉"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT REPORTS
                ================================================= */}

                <Route
                    path="/student/reports"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentFeature
                                title="Reports"
                                subtitle="View your learning progress and performance"
                                icon="▥"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT SETTINGS
                ================================================= */}

                <Route
                    path="/student/settings"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentFeature
                                title="Settings"
                                subtitle="Manage your LearnPool account settings"
                                icon="⚙"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   STUDENT CERTIFICATES
                ================================================= */}

                <Route
                    path="/student/certificates"
                    element={

                        <ProtectedRoute
                            allowedRole="student"
                        >

                            <StudentFeature
                                title="Certificates"
                                subtitle="View and download your certificates"
                                icon="◇"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   INSTRUCTOR
                ================================================= */}


                {/* INSTRUCTOR DASHBOARD */}

                <Route
                    path="/instructor/dashboard"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <Dashboard
                                role="instructor"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* INSTRUCTOR COURSES */}

                <Route
                    path="/instructor/courses"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <InstructorFeature
                                title="Courses"
                                subtitle="Manage your courses and enrolled students"
                                icon="▣"
                                buttonText="New Course"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* INSTRUCTOR STUDENTS */}

                <Route
                    path="/instructor/students"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <InstructorFeature
                                title="Students"
                                subtitle="View students enrolled in your courses"
                                icon="♙"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   INSTRUCTOR CLASSROOM
                ================================================= */}

                <Route
                    path="/instructor/classroom"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <InstructorClassroom />

                        </ProtectedRoute>

                    }
                />


                <Route
                    path="/instructor/classes"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <InstructorClassroom />

                        </ProtectedRoute>

                    }
                />


                {/* CREATE CLASS */}

                <Route
                    path="/instructor/classes/create"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <CreateClass />

                        </ProtectedRoute>

                    }
                />


                {/* EDIT CLASS */}

                <Route
                    path="/instructor/classes/:classId/edit"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <EditClass />

                        </ProtectedRoute>

                    }
                />


                {/* INSTRUCTOR ASSIGNMENTS */}

                <Route
                    path="/instructor/assignments"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <InstructorFeature
                                title="Assignments"
                                subtitle="Create, publish, grade and provide feedback"
                                icon="☷"
                                buttonText="New Assignment"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* INSTRUCTOR REPORTS */}

                <Route
                    path="/instructor/reports"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <InstructorFeature
                                title="Reports"
                                subtitle="View course and student performance reports"
                                icon="▥"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* INSTRUCTOR INBOX */}

                <Route
                    path="/instructor/inbox"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <InstructorFeature
                                title="Messages"
                                subtitle="Communicate with students and administrators"
                                icon="✉"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* INSTRUCTOR SETTINGS */}

                <Route
                    path="/instructor/settings"
                    element={

                        <ProtectedRoute
                            allowedRole="instructor"
                        >

                            <InstructorFeature
                                title="Settings"
                                subtitle="Manage instructor account settings"
                                icon="⚙"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   ADMIN
                ================================================= */}


                {/* ADMIN DASHBOARD */}

                <Route
                    path="/admin/dashboard"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <Dashboard
                                role="admin"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN USERS */}

                <Route
                    path="/admin/users"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Users"
                                subtitle="Manage all LearnPool users"
                                icon="♙"
                                buttonText="Add User"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN ROLES */}

                <Route
                    path="/admin/roles"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Roles"
                                subtitle="Manage user roles and permissions"
                                icon="◆"
                                buttonText="Create Role"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN COURSES */}

                <Route
                    path="/admin/courses"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Courses"
                                subtitle="Manage all courses"
                                icon="▣"
                                buttonText="Add Course"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN ENROLLMENTS */}

                <Route
                    path="/admin/enrollments"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Enrollments"
                                subtitle="Manage student course enrollments"
                                icon="☷"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN CLASSES */}

                <Route
                    path="/admin/classes"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminClasses />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN ASSIGNMENTS */}

                <Route
                    path="/admin/assignments"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Assignments"
                                subtitle="Manage platform assignments"
                                icon="☷"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN FILES */}

                <Route
                    path="/admin/files"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Files"
                                subtitle="Manage uploaded platform files"
                                icon="▰"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN ANNOUNCEMENTS */}

                <Route
                    path="/admin/announcements"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Announcements"
                                subtitle="Create and manage announcements"
                                icon="!"
                                buttonText="New Announcement"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN REPORTS */}

                <Route
                    path="/admin/reports"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Reports"
                                subtitle="View platform reports and analytics"
                                icon="▥"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN CERTIFICATES */}

                <Route
                    path="/admin/certificates"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Certificates"
                                subtitle="Manage certificates"
                                icon="◇"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN AUDIT LOGS */}

                <Route
                    path="/admin/audit-logs"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="Audit Logs"
                                subtitle="Track system activity"
                                icon="▤"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* ADMIN SETTINGS */}

                <Route
                    path="/admin/settings"
                    element={

                        <ProtectedRoute
                            allowedRole="admin"
                        >

                            <AdminFeature
                                title="System Settings"
                                subtitle="Configure LearnPool system settings"
                                icon="⚙"
                            />

                        </ProtectedRoute>

                    }
                />


                {/* =================================================
                   FALLBACK
                ================================================= */}

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