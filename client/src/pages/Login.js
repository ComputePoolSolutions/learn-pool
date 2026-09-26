import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../src/styles.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!email || !password) {
            setMessage("Please enter email and password");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: email.trim(),
                    password: password
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            const token = response.data.token;
            const user = response.data.user;

            if (!token || !user) {
                setMessage("Invalid response from server");
                setLoading(false);
                return;
            }

            if (rememberMe) {
                localStorage.setItem("token", token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );
            } else {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(user)
                );
            }

            setMessage("Login successful!");

            // Use the role returned by backend
            const userRole = user.role;

            setTimeout(() => {
                if (userRole === "student") {
                    navigate("/student/dashboard");
                } else if (userRole === "instructor") {
                    navigate("/instructor/dashboard");
                } else if (userRole === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    setMessage("Invalid user role");
                }
            }, 500);

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            if (error.response) {
                setMessage(
                    error.response.data?.message ||
                    "Login failed"
                );
            } else if (error.request) {
                setMessage(
                    "Cannot connect to server. Please start the backend."
                );
            } else {
                setMessage("Login failed");
            }
        }

        setLoading(false);
    };

    return (
        <div
            className="login-page"
            style={{
                backgroundImage: `
                    linear-gradient(
                        rgba(220, 232, 245, 0.45),
                        rgba(80, 100, 130, 0.35)
                    ),
                    url("/login-bg.jpg")
                `
            }}
        >

            <div className="login-overlay"></div>

            <div className="login-card">

                {/* LOGO */}

                <div className="login-logo">

                    <img
                        src="/compute-pool-logo.png"
                        alt="ComputePool Solutions"
                        className="login-logo-image"
                    />

                </div>


                {/* TITLE */}

                <h1>
                    Welcome to LearnPool
                </h1>

                <p className="login-subtitle">
                    Login to continue learning
                </p>


                {/* ROLE SELECTOR */}

                <div className="role-selector">

                    <button
                        type="button"
                        className={
                            role === "student"
                                ? "role-button selected"
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
                                ? "role-button selected"
                                : "role-button"
                        }
                        onClick={() => setRole("instructor")}
                    >
                        👨‍🏫 Instructor
                    </button>

                </div>


                {/* LOGIN FORM */}

                <form onSubmit={handleLogin}>

                    {/* EMAIL */}

                    <div className="input-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <div className="input-wrapper">

                            <span>
                                👤
                            </span>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                autoComplete="email"
                            />

                        </div>

                    </div>


                    {/* PASSWORD */}

                    <div className="input-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">

                            <span>
                                🔒
                            </span>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                autoComplete="current-password"
                            />

                        </div>

                    </div>


                    {/* REMEMBER ME */}

                    <div className="remember-row">

                        <label className="remember-label">

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


                        <button
                            type="button"
                            className="forgot-button"
                            onClick={() =>
                                alert(
                                    "Forgot password feature will be added soon."
                                )
                            }
                        >
                            Forgot password?
                        </button>

                    </div>


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing In..."
                            : "Sign In"}
                    </button>

                </form>


                {/* MESSAGE */}

                {message && (
                    <div
                        className={
                            message.toLowerCase().includes("success")
                                ? "login-message success"
                                : "login-message error"
                        }
                    >
                        {message}
                    </div>
                )}


                {/* FOOTER */}

                <div className="login-footer">
                    LearnPool
                    <span>•</span>
                    ComputePool Solutions
                </div>

            </div>

        </div>
    );
}

export default Login;