import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function NameStep() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    const cleanName = name.trim();

    if (!cleanName) {
      setError("Name is required");
      return;
    }

    if (cleanName.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    localStorage.setItem("avena_name", cleanName);

    navigate("/age");
  };

  return (
    <div className='register'>

      

        <div className="name">
      <h1>What should we call you?</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />

      <br />
      <br />

       <h4>This will be the name displayed on your profile...</h4>

      {error && <p>{error}</p>}

      <button
                onClick={handleNext}
                className="name-button"
                disabled={!name.trim()}
              >
                Next
              </button>
      </div>
    </div>
  );
}