import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import StudentLayout from "./components/StudentLayout";

import StudentDashboard from "./pages/student/StudentDashboard";
import MyCourses from "./pages/student/MyCourses";
import CourseDetails from "./pages/student/CourseDetails";
import StudentAssignments from "./pages/student/Assignments";
import StudentClassroom from "./pages/student/Classroom";
import StudentFiles from "./pages/student/Files";
import StudentInbox from "./pages/student/Inbox";
import StudentReports from "./pages/student/Reports";
import StudentSettings from "./pages/student/Settings";
import Certificates from "./pages/student/Certificates";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/MyCourses";
import InstructorStudents from "./pages/instructor/Students";
import InstructorAssignments from "./pages/instructor/Assignments";
import InstructorClassroom from "./pages/instructor/Classroom";
import InstructorFiles from "./pages/instructor/Files";
import InstructorInbox from "./pages/instructor/Inbox";
import InstructorReports from "./pages/instructor/Reports";
import InstructorSettings from "./pages/instructor/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<StudentLayout />}>

          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />

          <Route
            path="/student/courses"
            element={<MyCourses />}
          />

          <Route
            path="/student/course/:id"
            element={<CourseDetails />}
          />

          <Route
            path="/student/assignments"
            element={<StudentAssignments />}
          />

          <Route
            path="/student/classroom"
            element={<StudentClassroom />}
          />

          <Route
            path="/student/files"
            element={<StudentFiles />}
          />

          <Route
            path="/student/inbox"
            element={<StudentInbox />}
          />

          <Route
            path="/student/reports"
            element={<StudentReports />}
          />

          <Route
            path="/student/settings"
            element={<StudentSettings />}
          />

          <Route
            path="/student/certificates"
            element={<Certificates />}
          />

        </Route>

        <Route
          path="/instructor/dashboard"
          element={<InstructorDashboard />}
        />

        <Route
          path="/instructor/courses"
          element={<InstructorCourses />}
        />

        <Route
          path="/instructor/students"
          element={<InstructorStudents />}
        />

        <Route
          path="/instructor/assignments"
          element={<InstructorAssignments />}
        />

        <Route
          path="/instructor/classroom"
          element={<InstructorClassroom />}
        />

        <Route
          path="/instructor/files"
          element={<InstructorFiles />}
        />

        <Route
          path="/instructor/inbox"
          element={<InstructorInbox />}
        />

        <Route
          path="/instructor/reports"
          element={<InstructorReports />}
        />

        <Route
          path="/instructor/settings"
          element={<InstructorSettings />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;