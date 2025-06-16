import { useEffect, useState } from "react";
import API from "../api/api";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await API.get("/games"); // make sure this matches your backend route
        setGames(res.data);
      } catch (err) {
        console.error("Error fetching games:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (loading) return <p>Loading games...</p>;

  return (
    <div>
      <h2>Board Games</h2>
      {games.length === 0 ? (
        <p>No games available.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game._id}>
              <h3>{game.title}</h3>
              <p>Kategorija: {game.category || "Brez kategorije"}</p>
              <p>Deskripcija: {game.description}</p>
              <p>Status: {game.availability}</p>
              <p>Owner: {game.owner ? game.owner.username : "N/A"}</p>
              {game.image && <img src={game.image} alt={game.title} style={{ maxWidth: "200px" }} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
