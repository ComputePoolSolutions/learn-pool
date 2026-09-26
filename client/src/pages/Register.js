import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                    role
                }
            );

            setMessage(
                response.data.message ||
                "Registration successful"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );

        }
    };

    return (

        <div className="login-page">

            <div className="login-overlay"></div>

            <div className="login-card register-card">

                <div className="logo-circle">
                    LP
                </div>

                <h1>
                    Create LearnPool Account
                </h1>

                <p className="login-subtitle">
                    Join the LearnPool learning platform
                </p>

                <form onSubmit={handleRegister}>

                    <div className="input-group">

                        <label>Full Name</label>

                        <div className="input-wrapper">

                            <span>👤</span>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>

                    <div className="input-group">

                        <label>Email</label>

                        <div className="input-wrapper">

                            <span>✉</span>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <div className="input-wrapper">

                            <span>🔒</span>

                            <input
                                type="password"
                                placeholder="Create password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>

                    <div className="input-group">

                        <label>Role</label>

                        <select
                            className="role-select"
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                        >
                            <option value="student">
                                Student
                            </option>

                            <option value="instructor">
                                Instructor
                            </option>
                        </select>

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Create Account
                    </button>

                </form>

                {message && (
                    <div className="login-message success">
                        {message}
                    </div>
                )}

                <button
                    className="back-login"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    ← Back to Login
                </button>

            </div>

        </div>
    );
}

export default Register;