import React, { useState , useEffect} from "react";
import { useNavigate , Link} from "react-router-dom";
import './Bio.css'
export default function BioStep() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [savedPrompt, setSavedPrompt] = useState(null);

  useEffect(() => {
    const storedBio = localStorage.getItem("avena_bio");
    const storedPrompt = localStorage.getItem("avena_prompt");

    if (storedBio) setBio(storedBio);

    if (storedPrompt) {
      setSavedPrompt(JSON.parse(storedPrompt));
    }
  }, []);

  const handleNext = () => {
    localStorage.setItem("avena_bio", bio);

    navigate("/photo");
  };


  const removePrompt = () => {
    localStorage.removeItem("avena_prompt");
    setSavedPrompt(null);
  };

  return (
    <div className="registerr">
      <div className="bio-box">

        <div className="top-row">
          <h1>Share more about yourself</h1>
          <span
            className="skip"
            onClick={() => navigate("/photo")}
          >
            Skip
          </span>
        </div>

        <p className="bio-sub">
          Write a bio and prompt to help your profile stand out.
        </p>

        <div className="card">
          <h3>About me</h3>

          <textarea
            placeholder="Introduce yourself to make a strong impression..."
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              setError("");
            }}
            maxLength="180"
          />
        </div>

        <div className="card">
         {!savedPrompt ? (
          <div
            className="card add-card"
            onClick={() => navigate("/prompts")}
          >
            <h3>+ Add Prompt</h3>
            <p>Show off your personality</p>
          </div>
        ) : (
          <div className="card prompt-card">
            <div className="prompt-top">
              <h3>{savedPrompt.question}</h3>

              <span onClick={removePrompt} >✕</span>
            </div>

            <h3>{savedPrompt.answer}</h3>

            <button
              className="edt-btn"
              onClick={() => navigate("/prompts")}
            >
              Edit
            </button>
          </div>
        )}
        </div>

        <div className="tip-box">
          Adding a short intro about you could lead to more matches
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className="button"
          onClick={handleNext}
          disabled={!bio.trim()}
        >
          Next
        </button>

      </div>
    </div>
  );
}