import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function EditVibe() {
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

  const score = {
    calm: 0,
    deep: 0,
    wild: 0,
    guarded: 0
  };

 
  values.forEach((v) => {
    // LOVE TYPE
    if (v === "Consistency") score.calm += 2;
    if (v === "Deep conversations") score.deep += 2;
    if (v === "Attention & affection") score.deep += 1;
    if (v === "Freedom with trust") score.wild += 2;

    // ENERGY
    if (v === "Calm and private") score.calm += 2;
    if (v === "Loud and social") score.wild += 1;
    if (v === "Soft but intense") score.deep += 2;
    if (v === "Curious and unpredictable") score.wild += 2;

    // FEAR
    if (v === "Being misunderstood") score.guarded += 2;
    if (v === "Being controlled") score.wild += 1;
    if (v === "Being ignored") score.guarded += 2;
    if (v === "Wasting time") score.deep += 1;

    // ATTRACTION
    if (v === "Personality") score.deep += 2;
    if (v === "Looks") score.wild += 1;
    if (v === "Humor") score.calm += 1;
    if (v === "Energy") score.wild += 2;
  });

  // 🔥 FIND HIGHEST
  const highest = Object.keys(score).reduce((a, b) =>
    score[a] > score[b] ? a : b
  );

  

  // 🎯 MAP TO FINAL NAME
  switch (highest) {
    case "calm":
      return "Calm Soul";
    case "deep":
      return "Deep Flame";
    case "wild":
      return "Wild Spark";
    case "guarded":
      return "Guarded Heart";
    default:
      return "Balanced Energy";
  }

  
};
  

  const handleSave = () => {
    if (Object.keys(answers).length < 4) {
      setError("Answer all questions");
      return;
    }

    
    const formattedAnswers = questions.map((q) => ({
      question: q.question,
      answer: answers[q.id]
    }));

    const personalityType = getPersonalityType();
    console.log("Answer:", formattedAnswers)
     console.log("Type:", personalityType)
    

    // 🔥 SAVE TO LOCAL STORAGE
    localStorage.setItem(
      "avena_personalityAnswers",
      JSON.stringify(formattedAnswers)
    );

    localStorage.setItem(
      "avena_personalityType",
      personalityType
    );

    // 🔥 GO BACK
    navigate(-1);
  };

  return (
    <div className="personality-page">
      <div className="top-bar">
        <button onClick={() => navigate(-1)}>←</button>
      </div>

      <h1>Edit Your Vibe</h1>
      <p>Answer again to update your personality</p>

      {questions.map((item) => (
        <div key={item.id} className="question-box">
          <h3>{item.question}</h3>

          <div className="options">
            {item.options.map((option, i) => (
              <button
                key={i}
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

      <button className="next-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}