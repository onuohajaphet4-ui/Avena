import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./Interest.css";

export default function EditInterest() {
  const navigate = useNavigate();

  const interestData = {
    "🎮 Gaming": ["Fortnite","PlayStation","Freefire","Codm","E-Football"],
    "🍔 Food & Drink": ["Street Food","Ice-cream","Sweet Treats","Home-Made","Soda"],
    "🎵 Music": ["Afrobeats","Pop Music","Rock Music","Gospel Music","Amapiano"],
    "🎬 TV & Movies": ["Anime","Action Movies","Crime Shows","Fantasy Movies","Netflix"],
    "🌍 Going Out": ["Beach","Bars","Travel","Museums","Shopping"],
    "🏠 Staying In": ["Reading","Home Workout","Gaming Nights","Cooking","Movies"],
    "🌱 Wellness": ["Meditation","Self Care","Gym","Nature","Trying New Things"]
  };

  const [selected, setSelected] = useState([]);

  // load existing interests
  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("avena_interests")) || [];
    setSelected(saved);
  }, []);

  const toggleInterest = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      if (selected.length >= 10) return;
      setSelected([...selected, item]);
    }
  };

  const handleSave = () => {
    localStorage.setItem(
      "avena_interests",
      JSON.stringify(selected)
    );

    navigate(-1); // go back
  };

  return (
    <div className="interest-page">

      <div className="top-bar">
        <button onClick={() => navigate(-1)}>←</button>
        <span onClick={handleSave} >Save</span>
      </div>

      <h1>Edit your interests</h1>

      {/* selected tags */}
      {selected.length > 0 && (
        <div className="selected-tags">
          {selected.map((tag, i) => (
            <div key={i} className="tag active-tag">
              {tag}
              <span onClick={() => toggleInterest(tag)}>✕</span>
            </div>
          ))}
        </div>
      )}

      {/* categories */}
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

    </div>
  );
}