import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PhoneStep() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    const cleanPhone = phone.trim();

    if (!cleanPhone) {
      setError("Phone number is required");
      return;
    }

    if (cleanPhone.length < 10) {
      setError("Enter a valid phone number");
      return;
    }

    localStorage.setItem("avena_phone", cleanPhone);

    navigate("/gender");
  };

  return (
    <div className="register">
      <div className="phone-box">

        

        <h1>Your phone?</h1>

        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError("");
          }}
        />

        <p className="sub-text">
          Used for trust, recovery and account safety.
        </p>

        {error && <span className="error">{error}</span>}

        <button
          onClick={handleNext}
          className="phone-button"
          disabled={!phone.trim()}
        >
          Next
        </button>

      </div>
    </div>
  );
}