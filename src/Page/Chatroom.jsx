import "./Chatroom.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate , Link} from "react-router-dom";

const ChatRoom = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchMessages();
  }, []);

   useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {

  try {

    const res = await axios.get(
      `https://avena-backend.onrender.com/api/discover/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    

    setOtherUser(res.data.profile);
    console.log("Other:", res.data.profile);

  } catch (err) {

    console.log(err);

  }

};




  const fetchMessages = async () => {

    try {

      const res = await axios.get(
        `https://avena-backend.onrender.com/api/message/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessages(res.data);

    } catch (err) {

      console.log(err);

    }

  };



  const sendMessage = async () => {

    if (!text.trim()) return;

    try {

      const res = await axios.post(
        `https://avena-backend.onrender.com/api/message/${id}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessages((prev) => [...prev, res.data]);

      setText("");

    } catch (err) {

      console.log(err);

    }

  };

  




  return (

    <div className="chatroom">

      {/* HEADER */}

      <div className="chat-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <div className="header-user">

          <img
            src={
  otherUser?.photos?.[0] ||
  "/default.jpg"
}
            className="header-avatar"
          />

          <div>

            <h3>
              {otherUser?.name}
            </h3>

            <p style={{color:'green'}}>
              Online
            </p>

          </div>

        </div>

      </div>





      {/* MESSAGES */}

      <div className="messages">

        <img
            src={
  otherUser?.photos?.[0] ||
  "/default.jpg"
}
            className="header-avata"
          />

          <h3>
              {otherUser?.name}
            </h3>

            <button>
                <Link to={`/userprofile/${otherUser?.userId}`} style={{textDecoration:'none', color:'inherit'}}>View Profile</Link> 
            </button>




        {messages.map((msg) => {

          const isMine =
            msg.sender === currentUser._id;

          return (

            <div
              key={msg._id}
              className={
                isMine
                  ? "message my-message"
                  : "message other-message"
              }
            >

              {msg.text}

            </div>

          );

        })}

      </div>






      {/* INPUT */}

      <div className="chat-input-box">

        <button className="plus-btn">
          +
        </button>

        <input
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <button
          className="send-btn"
          onClick={sendMessage}
        >
          ➤
        </button>

      </div>

    </div>

  );

};

export default ChatRoom;