// Register.jsx
// This component provides a registration form for new users.
// It handles form state, validation, and submission to the backend API.

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles/Register.module.css";

/**
 * Register component for user account creation.
 * - Manages form state for username, email, and password.
 * - Submits registration data to the backend and stores the token on success.
 * - Navigates to the dashboard after successful registration.
 * - Provides a link to the login page for existing users.
 */
export default function Register() {
  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // Navigation hook
  const navigate = useNavigate();

  /**
   * Handles changes to form fields.
   * @param {object} e - The input change event.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handles form submission for registration.
   * @param {object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend API for registration
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Store token in localStorage and navigate to dashboard
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  // Render the registration form UI
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        {/* Login link for existing users */}
        <p>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}