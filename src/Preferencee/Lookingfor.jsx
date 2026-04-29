
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Lookingfor.css";

export default function LookingFor() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("avena_lookingFor");

    if (saved) {
      setSelected(saved);
    }
  }, []);

  const handleNext = () => {
    localStorage.setItem(
      "avena_lookingFor",
      selected
    );

    navigate("/relation");
  };

  const handleSkip = () => {
    navigate("/relation");
  };

  return (
    <div className="looking-page">

      <div className="top-bar">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <button
          className="skip-btn"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <div className="content">

        <h1>Who are you looking for?</h1>

        <p>
          Choose who you'd like to meet.
        </p>

        <div className="options">

          <button
            className={
              selected === "Man"
                ? "option active"
                : "option"
            }
            onClick={() =>
              setSelected("Man")
            }
          >
            Man
          </button>

          <button
            className={
              selected === "Woman"
                ? "option active"
                : "option"
            }
            onClick={() =>
              setSelected("Woman")
            }
          >
            Woman
          </button>

          <button
            className={
              selected === "Everyone"
                ? "option active"
                : "option"
            }
            onClick={() =>
              setSelected("Everyone")
            }
          >
            Everyone
          </button>

        </div>
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
}