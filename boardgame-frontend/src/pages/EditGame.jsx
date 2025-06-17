// EditGame.jsx
// This component provides a form for editing an existing board game.
// It fetches the game data on mount, allows the user to update fields, and submits changes to the backend.

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api.js";
import styles from "./styles/EditGame.module.css";

/**
 * EditGame component for editing a board game's details.
 * - Fetches the game by ID from the backend on mount.
 * - Allows the user to update the title, description, and category.
 * - Submits the updated data to the backend and navigates back to the dashboard.
 */
export default function EditGame() {
  // Get the game ID from the route parameters
  const { id } = useParams();
  // Navigation hook
  const navigate = useNavigate();
  // State for the form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    availability: true,
  });

  // Fetch the game data when the component mounts or the ID changes
  useEffect(() => {
    /**
     * Fetches the game data from the API and populates the form.
     */
    const fetchGame = async () => {
      try {
        const res = await API.get(`/games/${id}`);
        setFormData(res.data);
      } catch (err) {
        alert("Ne morem pridobiti igre.");
      }
    };
    fetchGame();
  }, [id]);

  /**
   * Handles changes to form fields.
   * @param {object} e - The input change event.
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Handles form submission to update the game.
   * @param {object} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/games/${id}`, formData);
      navigate("/dashboard");
    } catch (err) {
      alert("Napaka pri posodabljanju igre.");
    }
  };

  // Render the edit form UI
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formWrapper}>
        <h2>Uredi igro</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Naslov"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Opis"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Kategorija"
            value={formData.category}
            onChange={handleChange}
          />
          <button type="submit" className={styles.submitBtn}>Shrani</button>
          <button type="button" className={styles.cancelBtn} onClick={() => navigate("/dashboard")}>Prekliči </button>
        </form>
      </div>
    </div>
  );
}
