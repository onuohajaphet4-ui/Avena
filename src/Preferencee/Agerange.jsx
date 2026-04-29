
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AgeRange.css";

export default function AgeRange() {
  const navigate = useNavigate();

  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedMin = localStorage.getItem("avena_ageRangeMin");
    const savedMax = localStorage.getItem("avena_ageRangeMax");

    if (savedMin) setMinAge(Number(savedMin));
    if (savedMax) setMaxAge(Number(savedMax));
  }, []);

  const handleFinish = async () => {
    if (minAge >= maxAge) {
      setError("Minimum age must be lower than maximum age");
      return;
    }

    try {
      setLoading(true);
      setError("");

      localStorage.setItem("avena_ageRangeMin", minAge);
      localStorage.setItem("avena_ageRangeMax", maxAge);
       const token = localStorage.getItem("token");

      const payload = {
        lookingFor:
          localStorage.getItem("avena_lookingFor") || "",

        relationshipType:
          localStorage.getItem(
            "avena_relationshipType"
          ) || "",

        interests:
          JSON.parse(
            localStorage.getItem(
              "avena_interests"
            )
          ) || [],

        personalityAnswers:
          JSON.parse(
            localStorage.getItem(
              "avena_personalityAnswers"
            )
          ) || [],

        personalityType:
          localStorage.getItem(
            "avena_personalityType"
          ) || "",

        ageRangeMin: minAge,
        ageRangeMax: maxAge
      };

      await axios.post(
        "https://avena-backend.onrender.com/api/preference",
        payload,
        {
            
        headers: {
            Authorization: `Bearer ${token}`,
            },
          withCredentials: true
        }
      );

      localStorage.removeItem("avena_lookingFor");
      localStorage.removeItem(
        "avena_relationshipType"
      );
      localStorage.removeItem(
        "avena_interests"
      );
      localStorage.removeItem(
        "avena_personalityAnswers"
      );
      localStorage.removeItem(
        "avena_personalityType"
      );
      localStorage.removeItem(
        "avena_ageRangeMin"
      );
      localStorage.removeItem(
        "avena_ageRangeMax"
      );

      navigate("/home");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to save preferences"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "https://avena-backend.onrender.com/api/preference",
        {},
        {
            
        headers: {
            Authorization: `Bearer ${token}`,
            },
          withCredentials: true
        }
      );

      console.log(res.data);

      navigate("/home");
    } catch (error) {
      navigate("/home");
    }
  };

  return (
    <div className="age-page">

      <div className="top-bar">
        <button onClick={() => navigate(-1)}>
          ←
        </button>

        <span onClick={handleSkip}>
          Skip
        </span>
      </div>

      <div className="progress-bar">
                    <div className="age-progress-fill"></div>
                  </div>

      <h1>Choose your age range</h1>
      <p>
        Tell us the ages you'd like to meet.
      </p>

      <div className="range-box">

        <div className="range-card">
          <label>Minimum Age</label>

          <input
            type="range"
            min="18"
            max="60"
            value={minAge}
            onChange={(e) =>
              setMinAge(Number(e.target.value))
            }
          />

          <h2>{minAge}</h2>
        </div>

        <div className="range-card">
          <label>Maximum Age</label>

          <input
            type="range"
            min="18"
            max="60"
            value={maxAge}
            onChange={(e) =>
              setMaxAge(Number(e.target.value))
            }
          />

          <h2>{maxAge}</h2>
        </div>

      </div>

      {error && (
        <p className="error">{error}</p>
      )}
      <button
        className="finish-btn"
        onClick={handleFinish}
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Finish"}
      </button>

    </div>
  );
}