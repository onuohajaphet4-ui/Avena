import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Interest.css";

const Interest = () => {
  const navigate = useNavigate();

  const interestData = {
    "🎮 Gaming": [
      "Fortnite",
      "PlayStation",
      "Freefire",
      "Codm",
      "E-Football"
    ],

    "🍔 Food & Drink": [
      "Street Food",
      "Ice-cream",
      "Sweet Treats",
      "Home-Made",
      "Soda"
    ],

    "🎵 Music": [
      "Afrobeats",
      "Pop Music",
      "Rock Music",
      "Gospel Music",
      "Amapiano"
    ],

    "🎬 TV & Movies": [
      "Anime",
      "Action Movies",
      "Crime Shows",
      "Fantasy Movies",
      "Netflix"
    ],

    "🌍 Going Out": [
      "Beach",
      "Bars",
      "Travel",
      "Museums",
      "Shopping"
    ],

    "🏠 Staying In": [
      "Reading",
      "Home Workout",
      "Gaming Nights",
      "Cooking",
      "Movies"
    ],

    "🌱 Wellness": [
      "Meditation",
      "Self Care",
      "Gym",
      "Nature",
      "Trying New Things"
    ]
  };

  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem("avena_interests")) || []
  );

  const toggleInterest = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      if (selected.length >= 10) return;
      setSelected([...selected, item]);
    }
  };

  const removeTag = (item) => {
    setSelected(selected.filter((i) => i !== item));
  };

  const handleNext = () => {
    localStorage.setItem(
      "avena_interests",
      JSON.stringify(selected)
    );
    navigate("/personality");
  };

  const handleSkip = () => {
    navigate("/personality");
  };

  return (
    <div className="interest-page">
      <div className="top-bar">
        <button onClick={() => navigate(-1)}>←</button>
        <span onClick={handleSkip}>Skip</span>
      </div>


     <div className="progress-bar">
                   <div className="in-progress-fill"></div>
                 </div>

      <h1>What are you into?</h1>

      {selected.length > 0 && (
        <div className="selected-tags">
          {selected.map((tag, i) => (
            <div key={i} className="tag active-tag">
              {tag}
              <span onClick={() => removeTag(tag)}>✕</span>
            </div>
          ))}
        </div>
      )}

      <div className="interest-body">
        {Object.entries(interestData).map(([category, items]) => (
          <div key={category} className="category-block">
            <h3>{category}</h3>

            <div className="tags-wrap">
              {items.map((item, i) => (
                <button
                  key={i}
                  className={
                    selected.includes(item)
                      ? "tag selected"
                      : "tag"
                  }
                  onClick={() => toggleInterest(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="next-btn"
        onClick={handleNext}
      >
        Next {selected.length}/10
      </button>
    </div>
  );
};

export default Interest;