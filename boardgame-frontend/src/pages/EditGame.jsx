import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api.js";
import styles from "./styles/EditGame.module.css";

export default function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    availability: true,
  });

  useEffect(() => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/games/${id}`, formData);
      navigate("/dashboard");
    } catch (err) {
      alert("Napaka pri posodabljanju igre.");
    }
  };

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
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
          Razpoložljiv
        </label>
        <button type="submit" className={styles.submitBtn}>Shrani</button>
        <button type="button" className={styles.cancelBtn} onClick={() => navigate("/dashboard")}>
          Prekliči </button>
      </form>
    </div>
    </div>
  );
}
