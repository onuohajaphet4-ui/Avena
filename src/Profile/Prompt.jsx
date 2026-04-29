
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PromptFlow() {
  const navigate = useNavigate();

  const prompts = [
    "Perks of dating me...",
    "Life’s too short to...",
    "People would describe me as...",
    "My dream job is...",
    "We’ll click if...",
    "A surprising thing about me is ...",
    "First date wishlist..."
  ];

  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [answer, setAnswer] = useState("");

  const choosePrompt = (text) => {
    setSelectedPrompt(text);
  };

  const savePrompt = () => {
    if (!selectedPrompt || !answer.trim()) return;

    const promptData = {
      question: selectedPrompt,
      answer: answer.trim()
    };

    localStorage.setItem(
      "avena_prompt",
      JSON.stringify(promptData)
    );

    navigate("/bio");
  };

  return (
    <div className="register">

      <div className="bio-box">
      <div className="prompt">

      {!selectedPrompt ? (
        <div className="prompt-list">

          <div className="top-head">
            <span onClick={() => navigate("/bio")}>✕</span>
            <h1>Select a prompt</h1>
          </div>

          {prompts.map((item, index) => (
            <div
              key={index}
              className="prompt-item"
              onClick={() => choosePrompt(item)}
            >
              {item}
            </div>
          ))}

        </div>
      ) : (
        <div className="answer-box">

          <div className="top-head">
            <span onClick={() => setSelectedPrompt("")}>✕</span>
            <h1>Answer prompt</h1>
            <span onClick={savePrompt}>✔</span>
          </div>

          <div className="question-card">
            {selectedPrompt}
          </div>

          <textarea
            placeholder="Type your answer..."
            value={answer}
            maxLength="150"
            onChange={(e) => setAnswer(e.target.value)}
          />

          <p>{answer.length}/150</p>

        </div>
      )}


     </div>
     </div>
    </div>
  );
}