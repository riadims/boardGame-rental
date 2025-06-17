// Settings.jsx
// This component provides a form for users to change their password.
// It handles form state, validation, and submission to the backend API.

import { useState } from 'react';
import API from '../api/api.js';
import styles from './styles/Settings.module.css';
import { useNavigate } from 'react-router-dom';

/**
 * Settings component for changing the user's password.
 * - Manages form state for current, new, and confirm password fields.
 * - Validates that the new passwords match.
 * - Submits the password change request to the backend.
 * - Displays success or error messages based on the result.
 */
export default function Settings() {
  // Navigation hook
  const navigate = useNavigate();
  // State for form fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State for error and success messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  /**
   * Handles form submission for changing the password.
   * @param {object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate that new passwords match
    if (newPassword !== confirmPassword) {
      setError('Nova gesla se ne ujemata.');
      return;
    }

    try {
      // Send PUT request to backend API to change password
      const res = await API.put('/users/change-password', {
        currentPassword,
        newPassword,
      });

      setSuccess(res.data.message || 'Geslo je bilo uspešno spremenjeno.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Napaka pri spreminjanju gesla.');
    }
  };

  // Render the change password form UI
  return (
    <div className={styles.pageWrapper}>
      <h2>Spremeni geslo</h2>
      {/* Display error or success messages */}
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Trenutno geslo:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <label>Novo geslo:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label>Potrdi novo geslo:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Shrani</button>
        <button type="button" className={styles.cancelBtn} onClick={() => navigate("/dashboard")}>
          Prekliči
        </button>
      </form>
    </div>
  );
}
