// Login.jsx
// This component provides a login form for user authentication.
// It handles form state, validation, and submission to the backend API.

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles/Login.module.css";

/**
 * Login component for user authentication.
 * - Manages form state for email and password.
 * - Submits credentials to the backend and stores the token on success.
 * - Navigates to the dashboard after successful login.
 * - Provides a link to the registration page for new users.
 */
export default function Login() {
  // State for form fields
  const [formData, setFormData] = useState({ email: "", password: "" });
  // Navigation hook
  const navigate = useNavigate();

  /**
   * Handles changes to form fields.
   * @param {object} e - The input change event.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Handles form submission for login.
   * @param {object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend API for authentication
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Store token in localStorage and navigate to dashboard
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  // Render the login form UI
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>

        {/* Registration link for new users */}
        <p className={styles.registerText}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.registerLink}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}