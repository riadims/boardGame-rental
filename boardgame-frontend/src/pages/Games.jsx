import { useEffect, useState } from "react";
import API from "../api/api";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    API.get("/games")
      .then(res => setGames(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Board Games</h2>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            <strong>{game.title}</strong> – {game.description}
            <br />
            Status: {game.available ? "Available" : "Borrowed"}
          </li>
        ))}
      </ul>
    </div>
  );
}
