import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [role, setRole] = useState("student");

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

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
                response.data.message
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );

        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <img
                    src="/learnpool-logo.png"
                    alt="LearnPool"
                    className="login-logo"
                />

                <h1 className="login-title">
                    Create Account
                </h1>

                <div className="role-buttons">

                    <button
                        type="button"
                        className={
                            role === "student"
                                ? "role-button active"
                                : "role-button"
                        }
                        onClick={() =>
                            setRole("student")
                        }
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
                        onClick={() =>
                            setRole("instructor")
                        }
                    >
                        👨‍🏫 Instructor
                    </button>

                </div>

                <form onSubmit={handleRegister}>

                    <input
                        className="login-input"
                        type="text"
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

                    <input
                        className="login-input"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        className="login-input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Register
                    </button>

                </form>

                {message && (
                    <div className="login-message">
                        {message}
                    </div>
                )}

            </div>

        </div>
    );
}

export default Register;