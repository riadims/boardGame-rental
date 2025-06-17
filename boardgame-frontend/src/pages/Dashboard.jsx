// Dashboard.jsx
// This component displays the main dashboard for the board game rental app.
// It shows a list of games, allows users to borrow/return games, and provides owner controls for editing/deleting games.
// Users can also navigate to settings, log out, or add new games.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api.js';
import styles from './styles/Dashboard.module.css';
import { useNavigate } from "react-router-dom";

/**
 * Dashboard component for the board game rental application.
 * - Fetches and displays all games from the backend.
 * - Shows owner controls (edit/delete) for games owned by the user.
 * - Allows users to borrow or return games.
 * - Provides navigation to add new games, settings, and logout.
 */
export default function Dashboard() {
  const navigate = useNavigate();
  // State for all games
  const [games, setGames] = useState([]);
  // Loading state for async operations
  const [loading, setLoading] = useState(true);
  // Error state for API errors
  const [error, setError] = useState(null);
  // Current user's ID
  const [userId, setUserId] = useState(null);

  // Fetch user and games on mount
  useEffect(() => {
    /**
     * Fetches the current user and all games from the API.
     * Sets userId and games state accordingly.
     */
    async function fetchUserAndGames() {
      try {
        const userRes = await API.get('/users/me');
        setUserId(userRes.data._id);

        const gamesRes = await API.get('/games');
        setGames(gamesRes.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUserAndGames();
  }, []);

  /**
   * Fetches the latest list of games from the API.
   * Used after borrowing or returning a game.
   */
  const fetchGames = async () => {
    try {
      setLoading(true);
      const gamesRes = await API.get('/games');
      setGames(gamesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles borrowing a game by its ID.
   * @param {string} id - The game ID to borrow.
   */
  const handleBorrow = async (id) => {
    try {
      await API.put(`/games/rent/${id}`);
      await fetchGames();
    } catch (err) {
      alert(err.response?.data?.message || "Napaka pri izposoji igre.");
    }
  };

  /**
   * Handles returning a borrowed game by its ID.
   * @param {string} id - The game ID to return.
   */
  const handleReturn = async (id) => {
    try {
      await API.put(`/games/return/${id}`);
      await fetchGames();
    } catch (err) {
      alert(err.response?.data?.message || "Napaka pri vračilu igre.");
    }
  };

  /**
   * Navigates to the edit page for a specific game.
   * @param {string} id - The game ID to edit.
   */
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  /**
   * Handles deleting a game by its ID after user confirmation.
   * @param {string} id - The game ID to delete.
   */
  const handleDelete = async (id) => {
    if (!window.confirm("Si prepričan, da želiš izbrisati igro?")) return;

    try {
      await API.delete(`/games/${id}`);
      setGames(prev => prev.filter(game => game._id !== id));
    } catch (err) {
      alert("Ni bilo mogoče izbrisati igre.");
    }
  };

  /**
   * Logs out the user by removing the token and navigating to login.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  /**
   * Navigates to the settings page.
   */
  const handleSettings = () => {
    navigate('/settings');
  };

  // Show loading or error states
  if (loading) return <p>Nalaganje iger...</p>;
  if (error) return <p style={{ color: 'red' }}>Napaka: {error}</p>;

  // Main dashboard UI
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dobrodošli na nadzorni plošči</h1>
        <div className={styles.navButtons}>
          <button onClick={handleSettings} className={styles.settingsButton}>Nastavitve</button>
          <button onClick={handleLogout} className={styles.logoutButton}>Odjava</button>
        </div>
      </header>

      <h2>Seznam družabnih iger</h2>
      <Link to="/add-game">
        <button className={styles.addNew}>➕ Dodaj novo igro</button>
      </Link>

      {games.length === 0 ? (
        <p>Trenutno ni razpoložljivih iger.</p>
      ) : (
        // Render each game card
        games.map((game) => {
          // Check if the current user is the owner or has borrowed the game
          const isOwner = String(game.owner) === String(userId);
          const isBorrowedByUser = String(game.borrowedBy) === String(userId);

          return (
            <div className={styles.card} key={game._id}>
              <strong>{game.title}</strong>
              <p>{game.description || 'Brez opisa'}</p>
              <p>Kategorija: {game.category || 'Ni določena'}</p>
              <p>Razpoložljivost: {game.available ? 'Da' : 'Ne'}</p>

              <div className={styles.buttonGroup}>
                {/* Owner controls */}
                {isOwner && (
                  <>
                    <button className={styles.edit} onClick={() => handleEdit(game._id)}>Uredi</button>
                    <button className={styles.delete} onClick={() => handleDelete(game._id)}>Izbriši</button>
                  </>
                )}

                {/* Borrow button for non-owners if available */}
                {!isOwner && game.available && !isBorrowedByUser && (
                  <button className={styles.borrow} onClick={() => handleBorrow(game._id)}>Izposodi</button>
                )}

                {/* Return button if borrowed by user */}
                {isBorrowedByUser && (
                  <button className={styles.return} onClick={() => handleReturn(game._id)}>Vrni</button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
