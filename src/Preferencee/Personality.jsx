
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Personality.css";

export default function PersonalityStep() {
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "What kind of love feels best to you?",
      options: [
        "Consistency",
        "Deep conversations",
        "Attention & affection",
        "Freedom with trust"
      ]
    },
    {
      id: 2,
      question: "Which energy fits you most?",
      options: [
        "Calm and private",
        "Loud and social",
        "Soft but intense",
        "Curious and unpredictable"
      ]
    },
    {
      id: 3,
      question: "In relationships, your biggest fear is...",
      options: [
        "Being misunderstood",
        "Being controlled",
        "Being ignored",
        "Wasting time"
      ]
    },
    {
      id: 4,
      question: "What attracts you first?",
      options: [
        "Personality",
        "Looks",
        "Humor",
        "Energy"
      ]
    }
  ];

  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");

  const handleSelect = (qId, option) => {
    setAnswers({
      ...answers,
      [qId]: option
    });
    setError("");
  };

  const getPersonalityType = () => {
    const values = Object.values(answers);

    if (
      values.includes("Consistency") &&
      values.includes("Calm and private")
    ) {
      return "Calm Soul";
    }

    if (
      values.includes("Deep conversations") &&
      values.includes("Personality")
    ) {
      return "Magnetic Mind";
    }

    if (
      values.includes("Attention & affection") &&
      values.includes("Soft but intense")
    ) {
      return "Deep Flame";
    }

    if (
      values.includes("Freedom with trust") &&
      values.includes("Curious and unpredictable")
    ) {
      return "Wild Spark";
    }

    if (
      values.includes("Being misunderstood") ||
      values.includes("Being ignored")
    ) {
      return "Guarded Heart";
    }

    return "Balanced Energy";
  };

  const handleNext = () => {
    if (Object.keys(answers).length < 4) {
      setError("Answer all questions");
      return;
    }

    const formattedAnswers = questions.map((item) => ({
      question: item.question,
      answer: answers[item.id]
    }));

    const personalityType = getPersonalityType();

    localStorage.setItem(
      "avena_personalityAnswers",
      JSON.stringify(formattedAnswers)
    );

    localStorage.setItem(
      "avena_personalityType",
      personalityType
    );

    navigate("/agerange");
  };

  const handleSkip = () => {
    navigate("/agerange");
  };

  return (
    <div className="personality-page">
      <div className="top-bar">
        <button onClick={() => navigate(-1)}>←</button>
        <span onClick={handleSkip}>Skip</span>
      </div>


      <div className="progress-bar">
                    <div className="per-progress-fill"></div>
                  </div>

      <h1>Tell us your vibe</h1>
      <p>
        Answer a few questions so we can know your energy.
      </p>

      {questions.map((item) => (
        <div key={item.id} className="question-box">
          <h3>{item.question}</h3>

          <div className="options">
            {item.options.map((option, index) => (
              <button
                key={index}
                className={
                  answers[item.id] === option
                    ? "option active"
                    : "option"
                }
                onClick={() =>
                  handleSelect(item.id, option)
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && <p className="error">{error}</p>}

      <button
        className="next-btn"
        onClick={handleNext}
      >
        Continue
      </button>
    </div>
  );
}