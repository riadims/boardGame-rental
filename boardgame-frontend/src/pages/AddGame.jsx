// AddGame.jsx
// This component provides a form for adding a new board game to the system.
// It handles form state, validation, and submission to the backend API.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/AddGame.module.css';

/**
 * AddGame component for creating a new board game entry.
 * - Manages form state for title, description, category.
 * - Validates required fields and displays errors.
 * - Submits the new game to the backend and navigates to the dashboard on success.
 */
export default function AddGame() {
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  // Navigation hook
  const navigate = useNavigate();
  // Get the user's auth token from localStorage
  const token = localStorage.getItem('token');

  /**
   * Handles form submission to add a new game.
   * @param {object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError('Naslov igre je obvezen.');
      return;
    }

    try {
      // Send POST request to backend API to create a new game
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          category,
          availability: available,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Napaka pri dodajanju igre.');
      }

      // Navigate to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  // Render the add game form UI
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formWrapper}>
        <h2>Dodaj novo igro</h2>
        {/* Display error message if present */}
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label>Naslov:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Opis:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Kategorija:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button}>Shrani igro</button>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate("/dashboard")}>Prekliči </button>
        </form>
      </div>
    </div>
  );
}
