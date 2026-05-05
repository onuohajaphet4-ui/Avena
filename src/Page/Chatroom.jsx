import "./Chatroom.css";
import axios from "axios";
import { useEffect, useState , useRef} from "react";
import { useParams, useNavigate , Link} from "react-router-dom";
import {socket} from '../socket'

const ChatRoom = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastSeenUsers, setLastSeenUsers] = useState({});
  const [otherUser, setOtherUser] = useState(null);
  const [lastSeenMap, setLastSeenMap] = useState({});
  const messagesEndRef = useRef (null)
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

  useEffect(() => {

  if (currentUser?.id) {

    socket.emit(
      "join",
      currentUser.userId
    );

  }
  

}, [currentUser]);

useEffect(() => {

  socket.on("getOnlineUsers", (users) => {
    setOnlineUsers(users);
  });

  socket.on("userLastSeen", (data) => {
    console.log("LAST SEEN DATA:", data);
    setLastSeenUsers((prev) => ({
      ...prev,
      [data.userId]: data.lastSeen,
    }));

   

  });

  return () => {
    socket.off("getOnlineUsers");
    socket.off("userLastSeen");
  };

}, []);

useEffect (() => {

  messagesEndRef.current?.scrollIntoView({
    behavior:"smooth"
  })
} , [messages])


  

  const formatMessageDate = (date) => {
  const msgDate = new Date(date);
  const today = new Date();

  const isToday =
    msgDate.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isYesterday =
    msgDate.toDateString() === yesterday.toDateString();

  if (isToday) {
    return msgDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isYesterday) {
    return "Yesterday";
  }

  return msgDate.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};
  



const isOnline = onlineUsers.includes(otherUser?.userId);



const formatLastSeen = (date) => {

  if (!date) return "Offline";

  const lastSeen = new Date(date);
  const now = new Date();

  const diffMs = now - lastSeen;

  const diffHours =
    diffMs / (1000 * 60 * 60);

  // LESS THAN 24 HOURS
  if (diffHours < 24) {

    return `Last seen at ${lastSeen.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

  }

  // MORE THAN 24 HOURS
  return `Last seen ${lastSeen.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  })}`;
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

            <p className={
              isOnline 
              ? "online-text"
              : "offline-text"}>

  {isOnline
  ? "Online"
  : formatLastSeen(
      lastSeenUsers[otherUser?.userId]
    )}

    
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


        <div className="messages">

          <div className="message-ss">

  {messages.map((msg) => {

    const isMine =
      msg.sender === currentUser.id;

    return (

      <div key={msg._id}>

        {/* DATE */}
        {msg.createdAt && (

          <div className="chat-date">
            {formatMessageDate(msg.createdAt)}
          </div>

        )}






        {/* MESSAGE BUBBLE */}
        <div
          className={
            isMine
              ? "message my-message"
              : "message other-message"
          }
        >

          <p>{msg.text}</p>






          {/* TIME */}
          {msg.createdAt && (

            <div className="bubble-footer">

              {new Date(
                msg.createdAt
              ).toLocaleTimeString([], {

                hour: "2-digit",
                minute: "2-digit",

              })}

            </div>

          )}

        </div>

      </div>

    );

  })}


  <div ref={messagesEndRef}></div>

</div>
</div>
 



       

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