import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api.js';
import styles from './styles/Dashboard.module.css';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
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

  const handleEdit = (id) => {
  navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Si prepričan, da želiš izbrisati igro?")) return;

  try {
    await API.delete(`/games/${id}`); // Matches your Express route
    setGames(prev => prev.filter(game => game._id !== id)); // Remove from UI
  } catch (err) {
    console.error("Napaka pri brisanju igre:", err);
    alert("Ni bilo mogoče izbrisati igre.");
  }
  };

  const handleBorrow = (id) => {
    console.log('Borrow game', id);
  };

  const handleReturn = (id) => {
    console.log('Return game', id);
  };

    const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  if (loading) return <p>Nalaganje iger...</p>;
  if (error) return <p style={{ color: 'red' }}>Napaka: {error}</p>;

 return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dobrodošli na nadzorni plošči</h1>
        <div className={styles.navButtons}>
          <button onClick={handleSettings} className={styles.settingsButton}>Nastavitve</button>
          <button onClick={handleLogout} className={styles.logoutButton}>Odjava</button>
        </div>
      </header>


    <h2>Seznam razpoložljivih družabnih iger</h2>
    <Link to="/add-game">
      <button className={styles.addNew}>➕ Dodaj novo igro</button>
    </Link>

    {games.length === 0 ? (
      <p>Trenutno ni razpoložljivih iger.</p>
    ) : (
      games.map((game) => {
        const isOwner = game.owner === userId;
        const isBorrowedByUser = game.borrower === userId;

        return (
          <div className={styles.card} key={game._id}>
            <strong>{game.title}</strong>
            <p>{game.description || 'Brez opisa'}</p>
            <p>Kategorija: {game.category || 'Ni določena'}</p>
            <p>Razpoložljivost: {game.availability ? 'Da' : 'Ne'}</p>

            <div className={styles.buttonGroup}>
              {isOwner && (
                <>
                  <button className={styles.edit} onClick={() => handleEdit(game._id)}>
                    Uredi
                  </button>
                  <button className={styles.delete} onClick={() => handleDelete(game._id)}>
                    Izbriši
                  </button>
                </>
              )}

              {!isOwner && game.availability && !isBorrowedByUser && (
                <button className={styles.borrow} onClick={() => handleBorrow(game._id)}>
                  Izposodi
                </button>
              )}

              {isBorrowedByUser && (
                <button className={styles.return} onClick={() => handleReturn(game._id)}>
                  Vrni
                </button>
              )}
            </div>
          </div>
        );
      })
    )}
  </div>
)};
