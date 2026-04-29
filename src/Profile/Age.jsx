import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";

export default function AgeStep() {
  const navigate = useNavigate();

  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!dob) {
      setError("Birth date is required");
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 16) {
      setError("You must be at least 16 years old");
      return;
    }

    if (age > 100) {
      setError("Enter a realistic age");
      return;
    }

    localStorage.setItem("avena_age", age);
    localStorage.setItem("avena_dob", dob);

    navigate("/phone");
  };

  return (
    <div className="register">
      <div className="name">

         
        <h1>How old are you?</h1>

        <input
          type="date"
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
            setError("");
          }}
          className="age"
        />

        <br /><br />

        <h4>Your profile shows your age, not your birth date.</h4>

        {error && <p>{error}</p>}

        <button
                  onClick={handleNext}
                  className="age-button"
                  disabled={!dob}
                >
                  Next
                </button>
      </div>
    </div>
  );
}