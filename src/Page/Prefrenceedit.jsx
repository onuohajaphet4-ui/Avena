import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Prefrenceedit.css";
import { useNavigate } from "react-router-dom";

export default function EditPreference() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    lookingFor: "",
    relationshipType: "",
    interests: [],
    personalityType: "",
    ageRangeMin: 18,
    ageRangeMax: 30
  });

  const [interests, setInterests] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ LOAD FROM BACKEND
  useEffect(() => {
    fetchPref();
  }, []);

  const fetchPref = async () => {
  try {
    const res = await axios.get(
      "https://avena-backend.onrender.com/api/preference",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // 🔥 GET LOCAL PERSONALITY
    const savedPersonality = localStorage.getItem("avena_personalityType");

    setForm({
      ...res.data,
      interests: res.data.interests || [],
      personalityType: savedPersonality || res.data.personalityType || ""
    });

  } catch (err) {
    console.log(err);
  }
};

  

  // ✅ LOAD INTERESTS
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("avena_interests")) || [];
    setInterests(saved);
  }, []);

  // 🔁 REFRESH INTERESTS WHEN USER RETURNS
  useEffect(() => {
    const handleFocus = () => {
      const saved = JSON.parse(localStorage.getItem("avena_interests")) || [];
      setInterests(saved);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const removeInterest = (itemToRemove) => {
    const updated = interests.filter((item) => item !== itemToRemove);

    setInterests(updated);
    localStorage.setItem("avena_interests", JSON.stringify(updated));
  };

  const handleSubmit = async () => {
    try {
      const updatedForm = {
        ...form,
        interests: interests,
        personalityType: form.personalityType // ✅ IMPORTANT
      };

      console.log("SENDING:", updatedForm);

      await axios.put(
        "https://avena-backend.onrender.com/api/preference",
        updatedForm,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Updated ✅");
      navigate("/profile");

    } catch (err) {
      console.log(err);
    }
  };

  // 🎨 VIBE DISPLAY
  const getVibeDetails = (type) => {
    const vibes = {
      "Magnetic Mind": {
        emoji: "🧠✨",
        desc: "Deep thinker with irresistible energy",
        color: "linear-gradient(135deg, #6366f1, #8b5cf6)"
      },
      "Calm Soul": {
        emoji: "🌊",
        desc: "Peaceful, grounded and emotionally rich",
        color: "linear-gradient(135deg, #22c55e, #4ade80)"
      },
      "Wild Spark": {
        emoji: "🔥",
        desc: "High energy, spontaneous and fun",
        color: "linear-gradient(135deg, #f97316, #fb923c)"
      },
      "Guarded Heart": {
        emoji: "🛡️",
        desc: "Careful, protective, but deeply loving",
        color: "linear-gradient(135deg, #64748b, #94a3b8)"
      }
    };

    return vibes[type] || {
      emoji: "✨",
      desc: "Still discovering your vibe",
      color: "linear-gradient(135deg, #64748b, #94a3b8)"
    };
  };

  const vibe = getVibeDetails(form.personalityType);

  const lookingOptions = [
  { label: "Man", emoji: "👨" },
  { label: "Woman", emoji: "👩" },
  { label: "Everyone", emoji: "🌍" }
];

const relationshipOptions = [
  { label: "Monogamy", emoji: "💍" },
  { label: "Open relationship", emoji: "🔓" },
  { label: "Marriage minded", emoji: "👰" },
  { label: "Serious dating", emoji: "❤️" },
  { label: "Casual connection", emoji: "😎" },
  { label: "Still figuring it out", emoji: "🤔" }
];
  return (
    <div className="profile-body">
      <div className="edit-pref-page">

        <h2>Edit Preferences</h2>

        {/* LOOKING FOR */}
        <section className="edit-card">
          <h4>Looking For</h4>
          <div className="option-group">
            {lookingOptions.map((item) => (
  <button
    key={item.label}
    className={`option-btn ${form.lookingFor === item.label ? "active" : ""}`}
    onClick={() => setForm({ ...form, lookingFor: item.label })}
  >
    {item.emoji} {item.label}
  </button>
))}
          </div>
        </section>

        {/* RELATIONSHIP */}
        <section className="edit-card">
          <h4>Relationship Type</h4>

          <div className="option-group">
            {relationshipOptions.map((item) => (
  <button
    key={item.label}
    className={`option-btn ${form.relationshipType === item.label ? "active" : ""}`}
    onClick={() => setForm({ ...form, relationshipType: item.label })}
  >
    {item.emoji} {item.label}
  </button>
))}
          </div>
        </section>

        {/* INTERESTS */}
        <section className="edit-card">
          <h4>Interests</h4>

          <button
            className="add-btnN"
            onClick={() => navigate("/edit-interest")}
          >
            Add
          </button>

          <div className="interests-list">

            
            {interests.map((item, i) => (
              <div key={i} className="interest-chip">
                {item}
                <span onClick={() => removeInterest(item)}>✕</span>
              </div>
            ))}
          </div>

          
        </section>

        {/* VIBE */}
        <section className="edit-card">
          <h4>Your Vibe</h4>

          <button
            className="add-btnN"
            onClick={() => navigate("/edit-personality")}
          >
            Add
          </button>

          <div
            className="profile-card"
            style={{ background: vibe.color }}
          >
            <h3>Your Vibe</h3>

            <div className="vibe-content">
              <span className="vibe-emoji">{vibe.emoji}</span>

              <h2>{form.personalityType || "Not set"}</h2>

              <p>{vibe.desc}</p>
            </div>
          </div>
        </section>

        {/* AGE */}
        <div className="pref-section">
  <h4>Age Range</h4>

  <div className="range-container">

   {/* MIN */}
<input
  type="range"
  min="18"
  max="60"
  value={form.ageRangeMin}
  onChange={(e) => {
    const value = Number(e.target.value);

    setForm((prev) => ({
      ...prev,
      ageRangeMin: Math.min(value, prev.ageRangeMax - 1)
    }));
  }}
  className="range-slider"
/>

{/* MAX */}
<input
  type="range"
  min="18"
  max="60"
  value={form.ageRangeMax}
  onChange={(e) => {
    const value = Number(e.target.value);

    setForm((prev) => ({
      ...prev,
      ageRangeMax: Math.max(value, prev.ageRangeMin + 1)
    }));
  }}
  className="range-slider"
/>

    {/* DISPLAY */}
    <div className="range-values">
      <span>
  {Math.min(form.ageRangeMin, form.ageRangeMax)} —{" "}
  {Math.max(form.ageRangeMin, form.ageRangeMax)}
</span>
    </div>

  </div>
</div>

        <button className="save-btn" onClick={handleSubmit}>
          Save Changes
        </button>

      </div>
    </div>
  );
}