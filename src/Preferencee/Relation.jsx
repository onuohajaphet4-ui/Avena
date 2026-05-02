import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Relation.css";

const RelationshipType = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("avena_relationshipType");
    if (saved) setSelected(saved);
  }, []);

  const options = [
    { emoji: "💕", text: "Monogamy" },
    { emoji: "🔄", text: "Open relationship" },
    { emoji: "💍", text: "Marriage minded" },
    { emoji: "🤝", text: "Serious dating" },
    { emoji: "😎", text: "Casual connection" },
    { emoji: "🤔", text: "Still figuring it out" }
  ];

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    localStorage.setItem("avena_relationshipType", selected);
    navigate("/interest");
  };

  const handleSkip = () => {
    localStorage.removeItem("avena_relationshipType");
    navigate("/interest");
  };

  return (
    <div className="relationship-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <span className="skip-btn" onClick={handleSkip}>Skip</span>
      </div>


       <div className="progress-bar">
              <div className="rel-progress-fill"></div>
        </div>
      <h1>What relationship style suits you?</h1>
      <p>
        Choose what feels right now. You can always update it later.
      </p>

      <div className="grid-box">
        {options.map((item, index) => (
          <div
            key={index}
            className={`card ${selected === item.text ? "active" : ""}`}
            onClick={() => handleSelect(item.text)}
          >
            <span className="emoji">{item.emoji}</span>
            <h3>{item.text}</h3>
          </div>
        ))}
      </div>

       <button
        className="look-next-btn"
        onClick={handleNext}
        disabled={!selected}
      >
        Next
      </button>
    </div>
  );
};

export default RelationshipType;