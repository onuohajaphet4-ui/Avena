import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Gender.css'
export default function GenderStep() {
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [showGender, setShowGender] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!gender) {
      setError("Please select your gender");
      return;
    }

    localStorage.setItem("avena_gender", gender);
    localStorage.setItem("avena_showGender", showGender);

    navigate("/bio");
  };

  return (
    <div className="register">
      <div className="gender-box">

        <h1>What's your gender?</h1>

         

        <button
          className={gender === "Woman" ? "active" : ""}
          onClick={() => {
            setGender("Woman");
            setError("");
          }}
        >
          Woman
        </button>

        <button
          className={gender === "Man" ? "active" : ""}
          onClick={() => {
            setGender("Man");
            setError("");
          }}
        >
          Man
        </button>

        <div className="checkbox-area">
          <input
            type="checkbox"
            checked={showGender}
            onChange={() => setShowGender(!showGender)}
          />
          <span>Show my gender on my profile</span>
        </div>

        {error && <p>{error}</p>}

        <button
          onClick={handleNext}
          className="gen-button"
          disabled={!gender}
        >
          Next
        </button>

      </div>
    </div>
  );
}