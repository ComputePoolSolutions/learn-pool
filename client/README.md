Learn Pool – Learning Management System

1. Project Overview

Learn Pool is a web-based Learning Management System (LMS) for students, instructors, and administrators.

The system provides role-based access to courses, classes, assignments, files, reports, messages, certificates, and administration features.

2. Main Objectives

Provide one platform for online learning management.

Allow students to access courses and learning activities.

Allow instructors to manage courses, classes, assignments, and students.

Allow administrators to manage users and system resources.

Provide secure authentication and role-based navigation.

Store application data in MongoDB.

3. Technology Stack

Frontend

React.js

JavaScript

HTML5

CSS3

React Router DOM

Axios

Backend

Node.js

Express.js

REST APIs

JWT authentication

bcryptjs

dotenv

CORS

Database

MongoDB

MongoDB Atlas

Mongoose

Tools

Visual Studio Code

Node.js / npm

Postman

Git / GitHub

4. Project Structure

learn-pool/
├── client/
│   ├── public/
│   └── src/
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── student/
│       │   │   ├── StudentDashboard.js
│       │   │   ├── MyCourses.js
│       │   │   ├── CourseDetails.js
│       │   │   ├── Assignments.js
│       │   │   ├── Classroom.js
│       │   │   ├── Files.js
│       │   │   ├── Inbox.js
│       │   │   ├── Reports.js
│       │   │   ├── Settings.js
│       │   │   └── Certificates.js
│       │   └── instructor/
│       │       ├── InstructorDashboard.js
│       │       ├── Courses.js
│       │       ├── Students.js
│       │       ├── Assignments.js
│       │       ├── Classroom.js
│       │       ├── Files.js
│       │       ├── Inbox.js
│       │       ├── Reports.js
│       │       └── Settings.js
│       ├── App.js
│       └── index.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Role.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── courseRoutes.js
│   ├── .env
│   └── server.js
│
├── package.json
└── README.md

File names can change as new modules are added. Imports in App.js must always match the actual file names.

5. User Roles

Student

Students can:

Login

View dashboard

View courses and course details

View and submit assignments

View grades and feedback

View live, upcoming, and completed classes

Access recordings

Manage files

View inbox/messages

View reports

Manage settings

View certificates

Student routes:

/student/dashboard
/student/courses
/student/course/:id
/student/assignments
/student/classroom
/student/files
/student/inbox
/student/reports
/student/settings
/student/certificates

Instructor

Instructors can:

View dashboard

Manage courses

View students

Create and schedule classes

Add meeting links and recordings

Create and publish assignments

View submissions

Grade assignments

Provide feedback

View reports

Manage messages and files

Instructor routes:

/instructor/dashboard
/instructor/courses
/instructor/students
/instructor/assignments
/instructor/classroom
/instructor/files
/instructor/inbox
/instructor/reports
/instructor/settings

Admin

Administrators manage:

Users

Roles

Courses

Enrollments

Classes

Assignments

Files

Announcements

Reports

Certificates

Audit logs

System settings

6. Application Flow

Student

Login
  ↓
Student Dashboard
  ↓
My Courses → Course Details → Classes / Assignments / Materials / Progress
  ↓
Assignments → View / Download / Submit / Grade / Feedback
  ↓
Classroom → Live / Upcoming / Completed / Recording
  ↓
Files → Inbox → Reports → Settings → Certificates

Instructor

Login
  ↓
Instructor Dashboard
  ↓
Courses → Students / Classes / Assignments
  ↓
Classes → Create / Edit / Schedule / Meeting Link / Recording
  ↓
Assignments → Create / Publish / Submissions / Grade / Feedback
  ↓
Reports → Messages

Admin

Admin Login
  ↓
Admin Dashboard
  ↓
Users / Roles / Courses / Enrollments / Classes / Assignments
  ↓
Files / Announcements / Reports / Certificates
  ↓
Audit Logs / System Settings

7. Environment Configuration

Create:

server/.env

Use:

PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY

Never commit .env to GitHub and never share the actual MongoDB password or connection string.

8. Database Models

User

Fields:

name

email

password

role

isActive

timestamps

Roles:

student
instructor
admin

Role

Fields:

name

permissions

timestamps

Course

Fields:

title

description

instructorId

duration

status

timestamps

Status:

active
inactive

Enrollment

Fields:

studentId

courseId

enrolledAt

status

progress

timestamps

Status:

active
completed
cancelled

Progress:

0 to 100

9. Authentication

Registration:

POST /api/auth/register

Example:

{
  "name": "Test Student",
  "email": "student@example.com",
  "password": "password123",
  "role": "student"
}

Login:

POST /api/auth/login

Example:

{
  "email": "student@example.com",
  "password": "password123"
}

After login, the frontend stores the authentication token and user information and redirects according to the user's role.

10. Course APIs

Get active courses:

GET /api/courses

Create a course:

POST /api/courses

Example:

{
  "title": "Full Stack Web Development",
  "description": "Learn frontend and backend development",
  "instructorId": "INSTRUCTOR_MONGODB_ID",
  "duration": "12 Weeks"
}

11. Running the Project

Prerequisites

Install:

Node.js

npm

MongoDB Atlas

Visual Studio Code

Postman (recommended for API testing)

Check Node:

node --version

Check npm:

npm --version

Start Backend

cd "C:\Users\VYSHNAVI\Downloads\LEARN POOL PROJECT\learn-pool\learn-pool\server"
node server.js

Expected output:

MongoDB connected successfully
Server running on port 5000

Backend:

http://localhost:5000

Start Frontend

Open another terminal:

cd "C:\Users\VYSHNAVI\Downloads\LEARN POOL PROJECT\learn-pool\learn-pool\client"
npm start

Use the frontend port shown by React. In the current development setup it is commonly:

http://localhost:3001

If React selects another available port, use that port instead.

12. Important URLs

Authentication

http://localhost:3001/login
http://localhost:3001/register

Student

http://localhost:3001/student/dashboard
http://localhost:3001/student/courses
http://localhost:3001/student/assignments
http://localhost:3001/student/classroom
http://localhost:3001/student/files
http://localhost:3001/student/inbox
http://localhost:3001/student/reports
http://localhost:3001/student/settings
http://localhost:3001/student/certificates

Instructor

http://localhost:3001/instructor/dashboard
http://localhost:3001/instructor/courses
http://localhost:3001/instructor/students
http://localhost:3001/instructor/assignments
http://localhost:3001/instructor/classroom
http://localhost:3001/instructor/files
http://localhost:3001/instructor/inbox
http://localhost:3001/instructor/reports
http://localhost:3001/instructor/settings

Backend

http://localhost:5000/

13. Postman Testing

Test backend

GET http://localhost:5000/

Expected:

{
  "message": "Learn Pool API is running"
}

Register

POST http://localhost:5000/api/auth/register

Login

POST http://localhost:5000/api/auth/login

Get courses

GET http://localhost:5000/api/courses

14. Frontend-to-Backend Flow

React
  ↓
Axios
  ↓
Express REST API
  ↓
Mongoose
  ↓
MongoDB
  ↓
Express Response
  ↓
React

15. Role-Based Navigation

After successful login:

student
   ↓
/student/dashboard

instructor
   ↓
/instructor/dashboard

admin
   ↓
/admin/dashboard

16. UI Design

The application follows a modern LMS dashboard design:

Blue/purple gradient header

Left navigation sidebar

User profile area

Search bar

Dashboard cards

Course cards

Assignment sections

Classroom sections

File storage

Reports

Settings

Responsive layout

The login page is designed with Learn Pool branding, role selection, email/password fields, remember-me option, sign-in button, and forgot-password option.

17. Development Status

Completed:

Project setup

React frontend

Express backend

MongoDB connection

User model

Role model

Course model

Enrollment model

Registration API

Login API

JWT setup

React login/register

Role-based dashboard routing

Course API

Student course page

In progress:

Course details

Student assignments

Classroom

File management

Inbox

Reports

Certificates

Instructor module

Admin module

Authorization middleware

Testing

Deployment

18. Common Errors

Module not found

Example:

Can't resolve './pages/instructor/Courses'

Check that:

client/src/pages/instructor/Courses.js

actually exists.

If the real file is named InstructorCourses.js, change the import accordingly.

Backend connection refused

Start the backend:

node server.js

Port already in use

Check port 5000:

netstat -ano | findstr :5000

Check frontend ports:

netstat -ano | findstr :3000
netstat -ano | findstr :3001

MongoDB authentication error

Check:

MongoDB username

MongoDB password

Atlas IP access list

MONGO_URI

database name

Login.css not found

If Login.js contains:

import "./Login.css";

then:

client/src/pages/Login.css

must exist.

19. Recommended Development Order

1. Authentication
2. Student Dashboard
3. My Courses
4. Course Details
5. Assignments
6. Classroom
7. Files
8. Inbox
9. Reports
10. Certificates
11. Instructor
12. Admin
13. Authorization
14. Testing
15. Deployment

20. Security

For production:

Never commit .env.

Never store plain-text passwords.

Use bcrypt for passwords.

Use a strong JWT secret.

Add JWT verification middleware.

Add role-based authorization middleware.

Validate API input.

Restrict file uploads.

Configure CORS properly.

Use HTTPS.

Protect administrator APIs.

Validate MongoDB IDs.

Do not expose sensitive error information.

21. Development Procedure

Whenever a new page is added:

Create React page
      ↓
Add route in App.js
      ↓
Add navigation link
      ↓
Add CSS
      ↓
Connect API
      ↓
Test page
      ↓
Test navigation
      ↓
Check browser console
      ↓
Test API in Postman

22. Project Summary

Learn Pool is a role-based Learning Management System built with React, Node.js, Express, and MongoDB.

The project provides separate workflows for students, instructors, and administrators. The current foundation includes authentication, role-based routing, database models, course APIs, and the main frontend structure.

The remaining modules should be developed and tested one at a time to keep the application stable and easy to debug.

License

This project is intended for educational and development purposes.