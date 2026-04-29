import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import {Link, useParams} from 'react-router-dom'
import {FiEdit, FiSettings} from 'react-icons/fi'
import Nav from '../Component/Nav'


export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [preference, setPreference] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      `https://avena-backend.onrender.com/api/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    setUserData(res.data);

    setProfile(res.data.profile);

    setPreference(res.data.preference);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

  const nextPhoto = () => {
    if (!profile?.photos?.length) return;

    setPhotoIndex((prev) =>
      prev === profile.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevPhoto = () => {
    if (!profile?.photos?.length) return;

    setPhotoIndex((prev) =>
      prev === 0 ? profile.photos.length - 1 : prev - 1
    );
  };

  const safe = (value, fallback = "Unknown") => {
    if (!value) return fallback;

    if (Array.isArray(value)) {
      return value.length ? value.join(", ") : fallback;
    }

    return value;
  };

 const getAge = (dob) => {
  if (!dob) return "--";

  const today = new Date();
  const birthDate = new Date(dob);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

 const getInterestIcon = (interest) => {
  const map = {
    // 🎮 Gaming
    Fortnite: "🏗️",
    PlayStation: "🎮",
    Freefire: "🔥",
    Codm: "🔫",
    "E-Football": "⚽",

    // 🍔 Food & Drink
    "Street Food": "🍜",
    "Ice-cream": "🍦",
    "Sweet Treats": "🍩",
    "Home-Made": "🏠🍲",
    Soda: "🥤",

    // 🎵 Music
    Afrobeats: "✨",
    "Pop Music": "🎤",
    "Rock Music": "🎸",
    "Gospel Music": "🙏",
    Amapiano: "🎶",

    // 🎬 Shows & Movies
    Anime: "🔥",
    "Action Movies": "💥",
    "Crime Shows": "🕵️",
    "Fantasy Movies": "🧙",
    Netflix: "📺",

    // 🌍 Going Out
    Beach: "🏖️",
    Bars: "🍻",
    Travel: "✈️",
    Museums: "🏛️",
    Shopping: "🛍️",

    // 🏠 Staying In
    Reading: "📚",
    "Home Workout": "🏋️",
    "Gaming Nights": "🎮🌙",
    Cooking: "🍳",
    Movies: "🎬",

    // 🧘 Wellness
    Meditation: "🧘",
    "Self Care": "💆",
    Gym: "💪",
    Nature: "🌿",
    "Trying New Things": "✨"
  };

  return map[interest] || "✨";
};

const parsedPrompt = (() => {
  try {
    return profile?.prompt
      ? JSON.parse(profile.prompt)
      : null;
  } catch {
    return null;
  }
})();


const getVibeDetails = (type) => {
  const vibes = {
    "Magnetic Mind": {
      emoji: "🧠✨",
      desc: "Deep thinker with irresistible energy",
      color: "linear-gradient(135deg, #6366f1, #8b5cf6)"
    },
    "Calm Soul": {
      emoji: "🌊",
      desc: "Peaceful, grounded and emotionally rich",
      color: "linear-gradient(135deg, #22c55e, #4ade80)"
    },
    "Wild Spark": {
      emoji: "🔥",
      desc: "High energy, spontaneous and fun",
      color: "linear-gradient(135deg, #f97316, #fb923c)"
    },
    "Loyal Heart": {
      emoji: "💚",
      desc: "Real, consistent and trustworthy",
      color: "linear-gradient(135deg, #10b981, #34d399)"
    },
    "Curious Mind": {
      emoji: "🧠💡",
      desc: "Always exploring, always learning",
      color: "linear-gradient(135deg, #0ea5e9, #38bdf8)"
    }
  };

  return vibes[type] || {
    emoji: "✨",
    desc: "Still discovering your vibe",
    color: "linear-gradient(135deg, #64748b, #94a3b8)"
  };
};

const vibe = getVibeDetails(preference?.personalityType);


  if (loading) {
    return <div className="loading">Loading Profile...</div>;
  }

  return (
    <div className="profile-body">

      <Nav/>
    <div className="profile-page">

      {/* HEADER */}
      <div className="top-bar">
        <div className="mini-user">
          <img
            src={
              profile?.photos?.[0] ||
              "https://via.placeholder.com/300"
            }
            alt=""
          />

          <div>
            <h2>
              {safe(profile?.name, "User")},{" "}
              {getAge(profile?.age, "--")}
            </h2>

            <p>{safe(profile?.city, "Unknown City")}</p>
          </div>
        </div>

        
      </div>

      {/* PHOTO */}
     <div className="photo-slide">

        <div className="bars">
          {profile.photos?.map((_, index) => (
            <span
              key={index}
              className={
                photoIndex === index ? "active-bar" : ""
              }
            ></span>
          ))}
        </div>

        <img
          src={
            profile?.photos?.[photoIndex] ||
            "https://via.placeholder.com/500x700"
          }
          alt=""
        />

        <button
          className="left-nav"
          onClick={prevPhoto}
        >
          ‹
        </button>

        <button
          className="right-nav"
          onClick={nextPhoto}
        >
          ›
        </button>
      </div>

      {/* PROFILE STRENGTH */}
      <div className="strength">
        <div>
          <h3>Profile Strength</h3>
          <p>
            {profile?.completionPercentage || 0}%
          </p>
        </div>

        <div className="progress">
          <div
            style={{
              width: `${
                profile?.completionPercentage || 0
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="profile-card">
        <h3>About Me</h3>

        <p>
          {safe(
            profile?.bio,
            "Tell people something about you."
          )}
        </p>
        <div className="chips">
          <span className="interest-chip">
              {safe(profile?.gender, "Gender")}
          </span>

          <span className="interest-chip">
              {safe(profile?.school, "School")}
          </span>

          <span className="interest-chip">
           {safe(profile?.zodiac, "Zodiac")}
          </span>

          <span className="interest-chip">
            {safe(
              profile?.socialType,"Social Vibe"
            )}
          </span >

          <span className="interest-chip">
            {safe(profile?.height, "Height")}'ft
          </span>

          
        </div>
      </section>

      {/* PROMPT */}
<section className="prompt-card">

  {parsedPrompt ? (
    <>
      <div className="quote-mark">“</div>

      <h3 className="prompt-question">
        {parsedPrompt.question}
      </h3>

      <p className="prompt-answer">
        {parsedPrompt.answer}
      </p>
    </>
  ) : (
    <div className="empty-prompt">
      <p>No prompt yet</p>
      <button className="add-btn">+</button>
    </div>
  )}

</section>

      {/* GOALS */}
      <section className="prompt-card">

  <h3>Connection Goals</h3>

  <div className="goal-row">
    <span className="goal-label">Looking For</span>
    <span className="goal-pill highlight">
      💕 {preference?.lookingFor || "Open"}
    </span>
  </div>

  <div className="goal-row">
    <span className="goal-label">Intent</span>
    <span className="goal-pill intent">
      🎯 {preference?.relationshipType || "Exploring"}
    </span>
  </div>

  <div className="age-range-box">
    <span>Age Range</span>

    <div className="age-bar">
      <div
        className="age-fill"
        style={{
          width: `${
            ((preference?.ageRangeMax || 30) / 100) * 100
          }%`
        }}
      ></div>
    </div>

    <p>
      {preference?.ageRangeMin || 18} —{" "}
      {preference?.ageRangeMax || 30}
    </p>
  </div>

</section>
      {/* INTERESTS */}
     
<section className="profile-card interests-card">
  <h3>Interests</h3>

  <div className="interest-grid">
    {preference?.interests?.length > 0 ? (
      preference.interests.map((item, i) => (
        <div key={i} className="interest-chip">
          <span className="emoji">
            {getInterestIcon(item)}
          </span>
          <span>{item}</span>
        </div>
      ))
    ) : (
      <p className="empty">No interests yet</p>
    )}
  </div>
</section>

      {/* ENTERTAINMENT */}
      <section className="profile-card">
        <h3>Entertainment</h3>

        <div className="chips">
          {profile?.musicTaste
            ?.length ? (
            profile.musicTaste.map(
              (item, i) => (
                <span className="interest-chip" key={i}>
                  🎵 {item}
                </span>
              )
            )
          ) : (
            <span className="interest-chip">
              No music taste yet
            </span>
          )}

          

         

          {profile?.movieTaste
            ?.length ? (
            profile.movieTaste.map(
              (item, i) => (
                <span className="interest-chip" key={i}>
                  🎬 {item}
                </span>
              )

            )
            ) : (
            <span className="interest-chip">
              No movie taste yet
            </span>
          )}
        </div>
      </section>

      {/* LIFE */}
      <section className="profile-card fun-card">
  <h3>Fun Side</h3>

  <div className="fun-grid">
    <div className="fun-item">
      <span className="emoji">🍔</span>
      <p className="label">Favorite Food</p>
      <p className="value">
        {profile?.favoriteFood || "Still figuring this out 🤔"}
      </p>
    </div>

    <div className="fun-item">
      <span className="emoji">✈️</span>
      <p className="label">Dream Country</p>
      <p className="value">
        {profile?.dreamCountry || "On my wishlist 🌍"}
      </p>
    </div>

    <div className="fun-item">
      <span className="emoji">☕</span>
      <p className="label">First Hangout</p>
      <p className="value">
        {profile?.firstHangout || "Let's find out 😉"}
      </p>
    </div>

    <div className="fun-item">
      <span className="emoji">💚</span>
      <p className="label">Green Flag</p>
      <p className="value">
        {profile?.greenFlag || "Good vibes only ✨"}
      </p>
    </div>

    <div className="fun-item">
      <span className="emoji">🚩</span>
      <p className="label">Red Flag</p>
      <p className="value">
        {profile?.redFlag || "We all have one 👀"}
      </p>
    </div>
  </div>
</section>

      {/* PERSONALITY */}
      

<section
  className="profile-card"
  style={{ background: vibe.color }}
>

  <h3>Your Vibe</h3>

  <div className="vibe-content">
    <span className="vibe-emoji">
      {vibe.emoji}
    </span>

    <h2>{preference?.personalityType || "Unknown Vibe"}</h2>

    <p>{vibe.desc}</p>
  </div>
</section>

     

     
    </div>
    </div>
  );
}