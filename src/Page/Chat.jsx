import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from '../Component/Nav'
import './Chat.css'
import {FaSearch  } from "react-icons/fa";
import {Link} from 'react-router-dom'

const Matches = () => {
  const [search, setSearch] = useState("");
  const [matches, setMatches] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log("stored user:", currentUser)
  const currentUserId = currentUser?._id;
    
 

  const getMatches = async () => {
    
    
    try {

      const res = await axios.get(
        "https://avena-backend.onrender.com/api/match",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      

      setMatches(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    getMatches();

  }, []);

  const filteredMatches = matches.filter((match) => {

  const otherUser = match.users.find(
    (u) => u._id !== currentUser._id
  );

  return otherUser?.profile?.name
    ?.toLowerCase()
    .includes(search.toLowerCase());

});

  return (

    <div className="chatPage">

      <Nav/>

      <div className="chatHeader">
        <h1>My Matches ❤️</h1>
      </div>

      <hr />

      <div className="search-container">

  

     <div className="input-wrapperr">
            <FaSearch  style={{marginTop:'px', color:'#ec4899',marginRight:'10px'}}  className='input-iccon' />
          <input
              type="text"
              placeholder="Search matches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
           />
      </div>


      </div>

      <div className="matchContainer">

        {filteredMatches.map((match) => {
          console.log("Current User:", currentUser.id)
         console.log("Match Users:", match.users)

          const otherUser = match.users.find(
            (u) => u._id !== currentUser.id
          );

           console.log(otherUser)
          return (

           <Link
  to={`/chatroom/${otherUser._id}`}
  style={{textDecoration:'none', color:'inherit'}}
>

   <div className="matchCard" key={match._id}>

              <img
  src={otherUser?.profile?.photos?.[0] || "/default.jpg"}
  alt=""
  className="matchImage"
/>

              <div className="matchInfo">

                <h2>{otherUser.profile?.name}</h2>

                <p>Tap to chat</p>

              </div>

            </div>

</Link>

          );

        })}
        {filteredMatches.length === 0 && (
        <p style={{ textAlign: "center", color: "gray", fontWight:'bold' }}>No User Found</p>
      )}

      </div>

    </div>



  );

};

export default Matches;