import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!email || !password) {
            setMessage("Please enter email and password.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            const loggedInUser = response.data.user;

            // Save login information
            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(loggedInUser)
            );

            if (rememberMe) {
                localStorage.setItem(
                    "rememberMe",
                    "true"
                );
            } else {
                localStorage.removeItem("rememberMe");
            }

            setMessage("Login successful!");

            // Navigate according to actual role
            if (loggedInUser.role === "student") {
                navigate("/student/dashboard");
            } else if (loggedInUser.role === "instructor") {
                navigate("/instructor/dashboard");
            } else if (loggedInUser.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                setMessage("Invalid user role.");
            }

        } catch (error) {
            console.error("Login error:", error);

            setMessage(
                error.response?.data?.message ||
                "Invalid email or password."
            );
        }
    };

    return (
        <div className="login-page">

            {/* Background overlay */}
            <div className="login-overlay"></div>

            {/* Login Card */}
            <div className="login-card">

                {/* Logo */}
                <div className="login-logo-container">
                    <div className="company-logo">
                        <div className="logo-chip">B</div>
                        <div className="logo-company">
                            COMPUTEPOOL
                        </div>
                        <div className="logo-solutions">
                            SOLUTIONS
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="login-title">
                    Welcome to LearnPool
                </h1>

                {/* Role Buttons */}
                <div className="role-buttons">

                    <button
                        type="button"
                        className={
                            role === "student"
                                ? "role-button active"
                                : "role-button"
                        }
                        onClick={() => setRole("student")}
                    >
                        🎓 Student
                    </button>

                    <button
                        type="button"
                        className={
                            role === "instructor"
                                ? "role-button active"
                                : "role-button"
                        }
                        onClick={() => setRole("instructor")}
                    >
                        🧑‍🏫 Instructor
                    </button>

                </div>

                {/* Login Form */}
                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    {/* Email */}
                    <div className="input-group">

                        <span className="input-icon">
                            👤
                        </span>

                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                    {/* Password */}
                    <div className="input-group">

                        <span className="input-icon">
                            🔒
                        </span>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    {/* Remember Me */}
                    <div className="remember-row">

                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />

                            <span>
                                Remember me
                            </span>
                        </label>

                    </div>

                    {/* Login Message */}
                    {message && (
                        <div
                            className={
                                message === "Login successful!"
                                    ? "login-message success"
                                    : "login-message error"
                            }
                        >
                            {message}
                        </div>
                    )}

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="signin-button"
                    >
                        Sign In
                    </button>

                    {/* Forgot Password */}
                    <button
                        type="button"
                        className="forgot-password"
                        onClick={() =>
                            alert(
                                "Password recovery will be added later."
                            )
                        }
                    >
                        Forgot password?
                    </button>

                </form>

            </div>
        </div>
    );
}

export default Login;