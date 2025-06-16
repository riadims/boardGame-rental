import { useState } from 'react';
import API from '../api/api.js';
import styles from './styles/Settings.module.css';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError('Nova gesla se ne ujemata.');
      return;
    }

    try {
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

  return (
    <div className={styles.pageWrapper}>
      <h2>Spremeni geslo</h2>
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
                  Prekliči </button>
      </form>
    </div>
  );
}
