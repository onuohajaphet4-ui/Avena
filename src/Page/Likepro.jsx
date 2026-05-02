import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Nav from "../Component/Nav";
import {
  CircularProgress,
} from "@mui/material";

export default function Discovery() {

  const { id } = useParams();

  const [currentUser, setCurrentUser] = useState(null);
  const [open, setOpen] = useState(null);
  const [likes, setLikes] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://avena-backend.onrender.com/api/discover/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCurrentUser(res.data);
        console.log(res.data)

      } catch (err) {

        console.log(err);

      }
    };

    fetchUser();

  }, [id]);



  const handleLikeBack = async (like) => {
    
  
      try {
  
        const res = await axios.post(
          `https://avena-backend.onrender.com/api/like/${like.profile.userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
       if (res.data.matched) {
  alert("Matched ❤️");
} else {
  alert("User liked");
}
      } catch (err) {
        console.log(err);
  
      }finally {
      setLoading(false);
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
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50%" }}>
        <CircularProgress style={{color:'#ec4899'}} />
      </div>
    );
  }



  return (

    <div>

      <Nav />
      

      <div className="discovery">

        <div className="card">

          {/* IMAGE */}
          <img
            src={currentUser.profile?.photos?.[0] || "/default.jpg"}
            className="card-img"
            alt=""
          />



          {/* OVERLAY */}
          <div className="card-overlay">

            {/* NAME */}
            <h2>
              {currentUser.profile?.name},{" "}
              {getAge(currentUser.profile?.age)} •{" "}
              <span>
                {currentUser.profile?.zodiac || "—"}
              </span>
            </h2>



            {/* SCORE */}
            <div className="score">
              Matching Score : {currentUser.score || 0}%
            </div>



            {/* BIO */}
            <p className="bio">

              <span>
                {currentUser.profile?.bio}
              </span>

            </p>



            {/* RELATIONSHIP */}
            <p className="chemistry">

              {currentUser.profile?.city
                ? `📍 You both in ${currentUser.profile?.city}`
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
                🧠{" "}
                {currentUser.profile?.socialType || "Chill"}
              </span>

            </div>



            {/* SETTINGS */}
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

        </div>



        {/* ACTION BUTTONS */}
        <div className="actions">

         <Link to='/like' style={{textDecoration:'none', color:'inherit'}}> <button className="skip">
            ❌
          </button> </Link> 

          <button
            className="like"
            onClick={() => handleLikeBack (currentUser)}
          >
            ❤️
          </button>

        </div>

      </div>

    </div>

  );
}