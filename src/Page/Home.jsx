import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Nav from "../Component/Nav";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Discovery() {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://avena-backend.onrender.com/api/discover",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  


  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const currentUser = users[index];
  console.log(currentUser)
  
  const handleNext = () => {
    setIndex((prev) => prev + 1);
    setOpen(null); 
  };

  const handleLike = async () => {

  try {

    await axios.post(
      `https://avena-backend.onrender.com/api/like/${currentUser.userId}`,
      {
        receiverId: currentUser.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("Liked:", currentUser.userId);

    handleNext();

  } catch (err) {

    console.log(err);

  }

};


  const getAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  

  if (!currentUser) {
  return (
    <div className="discovery">

      <Nav />

      <div className="empty-state">

        <h2>No more people 😢</h2>

        <p>
          You've seen everyone for now.
          Check back later for new matches.
        </p>

        <button
          onClick={() => setIndex(0)}
          className="restart-btn"
        >
          Start Again
        </button>

      </div>

    </div>
  );
}

  return (
    <div>
      <Nav />

      <div className="discovery">
        <motion.div
  className="card"
  style={{ x, rotate, opacity }}
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(event, info) => {
    if (info.offset.x > 100) {
      handleLike();
    } else if (info.offset.x < -100) {

      handleNext();
    }
  }}
>

          

          {/* IMAGE */}
          <img
            src={currentUser.photos?.[0] || "/default.jpg"}
            className="card-img"
            alt=""
          />

          {/* OVERLAY */}
          <div className="card-overlay">

            {/* NAME */}
            <h2>
              {currentUser.name}, {getAge(currentUser.age)} •{" "}
              <span>{currentUser.zodiac || "—"} </span> 
            </h2>

            <div className="score">
              Matching Score :{currentUser.score}%
            </div>

            <p className="bio">
                   <span>{currentUser.bio}, {currentUser.preference?.relationshipType}</span>
            </p>
            
            
            {/* CHEMISTRY */}
            <p className="chemistry">
              {currentUser.city
                ? `📍 You both in ${currentUser.city}`
                : "✨ Good vibe match"}
            </p>

            {/* PERSONALITY */}
            <div className="tags">
              <span>
                🔥{" "}
                {currentUser.preference?.personalityType ||
                  "Balanced Energy"}
              </span>

              <span>
                🧠 {currentUser.socialType || "Chil"}
              </span>
            </div>

            {/* CLICKABLE SECTIONS */}
            <div className="settings">

              {/* INTERESTS */}
              <div
                className="itemm"
                onClick={() => toggle("interests")}
              >
                Interests <span>›</span>
              </div>


             
              {open === "interests" && (
                <div className="dropdown">
                  <div className="interest-chip">
                  {currentUser.preference?.interests?.length > 0
                    ? currentUser.preference.interests.join(", ")
                    : "No interests"}
                    </div>
                </div>
              )}
              

              
              

            </div>
          </div>

          
          
        </motion.div>

        <div className="actions">
            <button className="skip" onClick={handleNext}>
              ❌
            </button>
            <button className="like" onClick={handleLike}>
              ❤️
            </button>
          </div>
      </div>
    </div>
  );
}