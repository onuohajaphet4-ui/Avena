import { useEffect, useState } from "react";
import axios from "axios";
import "./Like.css";
import Nav from "../Component/Nav";
import { Link } from "react-router-dom";

export default function Likes() {

  const [likes, setLikes] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {

    const fetchLikes = async () => {

      try {

        const res = await axios.get(
          "https://avena-backend.onrender.com/api/like",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLikes(res.data);

        console.log(res.data);

      } catch (err) {

        console.log(err);

      }
    };

    fetchLikes();

  }, []);





  const handleLikeBack = async (like) => {

    try {

      await axios.post(
        `https://avena-backend.onrender.com/api/like/${like.sender._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // 🔥 OPEN FULL PROFILE
      setSelectedUser(like);

    } catch (err) {

      console.log(err);

    }

  };





  const handlePass = (id) => {

    setLikes((prev) =>
      prev.filter((item) => item._id !== id)
    );

  };





  return (

    <div>

      <Nav />

      <div className="likes-page">

        <h1>Likes You ❤️</h1>


       <hr />


        <div className="likes-container">

          {

            likes.length > 0 ? (

              likes.map((like) => (

                <div
                  className="like-card"
                  key={like._id}
                >

                  {/* IMAGE */}
                  <img
                    src={
                      like?.profile?.photos?.[0] ||
                      "/default.jpg"
                    }
                    className="like-image"
                    alt=""
                  />





                  <div className="like-info">

                    {/* NAME */}
                    <h3>
                      {like.profile?.name}
                    </h3>

                    {/* MATCH */}
                    <p className="match">
                      🔥 {like.score || 8}% Match
                    </p>

                    {/* PERSONALITY */}
                    <p className="personality">
                      {like.preference?.personalityType ||
                        "Balanced Energy"}
                    </p>





                    <div className="like-buttons">

                      <Link to={`/likeprofile/${like.sender._id}`}>
  <button className="like-back">
    ❤️ View Profile
  </button>
</Link>

                      <button
                        className="pass"
                        onClick={() =>
                          handlePass(like._id)
                        }
                      >
                        ❌ Pass
                      </button>

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="like-empty-state">

                <h2>No likes yet 😢</h2>

                <p>
                  You've seen everyone for now.
                  Check back later for new Likes.
                </p>

                <Link to="/home">

                  <button className="restart-btn">
                    Back to Home
                  </button>

                </Link>

              </div>

            )

          }

        </div>



      
      </div>

    </div>

  );

}


