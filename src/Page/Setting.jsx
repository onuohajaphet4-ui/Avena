import { useState, useEffect } from "react";
import "./Setting.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";





export default function Settings() {
  const { id } = useParams();
  const [open, setOpen] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [showTo, setShowTo] = useState("Everyone");
  const [notifications, setNotifications] = useState(true);
  const [hideAge, setHideAge] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



   


  const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm(
    "This will permanently delete your account. Continue?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const userId = user?.id;

    if (!userId) {
      alert("User ID not found");
      return;
    }

    await axios.delete(
      `https://avena-backend.onrender.com/api/user/delete/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.clear();
    navigate("/");

  } catch (err) {
    console.error(err);
    alert("Failed to delete account");
  }
};


  // Load from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const phone = localStorage.getItem("avena_phone");

    if (user) setEmail(user.email);
    if (phone) setPhone(phone);

    setShowTo(localStorage.getItem("show_to") || "Everyone");
    setNotifications(JSON.parse(localStorage.getItem("notifications")) ?? true);
    setHideAge(JSON.parse(localStorage.getItem("hide_age")) ?? false);
    setAnimations(JSON.parse(localStorage.getItem("animations")) ?? true);
  }, []);

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  


  navigate("/login");
};

  return (
    <div className="profile-body">
      <div className="settings">
        <h1 className="title">Settings</h1>

        {/* ACCOUNT */}
        <div className="section">
          <h3>Account</h3>

          <div className="item" onClick={() => toggle("email")}>
            Email <span>›</span>
          </div>
          {open === "email" && (
            <div className="dropdown">{email || "No email found"}</div>
          )}

          <div className="item" onClick={() => toggle("password")}>
            Change Password <span>›</span>
          </div>
          {open === "password" && (
            <div className="dropdown">You’ll add password change later</div>
          )}

          <div className="item" onClick={() => toggle("phone")}>
            Phone Number <span>›</span>
          </div>
          {open === "phone" && (
            <div className="dropdown">{phone || "No phone number"}</div>
          )}
        </div>

        {/* PRIVACY */}
        <div className="section">
          <h3>Privacy & Visibility</h3>

          <div className="item" onClick={() => toggle("showTo")}>
            Show Profile To <span>›</span>
          </div>
          {open === "showTo" && (
            <div className="dropdown options">
              {["Men", "Women", "Everyone"].map((opt) => (
                <div
                  key={opt}
                  className={showTo === opt ? "active" : ""}
                  onClick={() => {
                    setShowTo(opt);
                    localStorage.setItem("show_to", opt);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}

          <div className="item toggle">
            Hide Age
            <input
              type="checkbox"
              checked={hideAge}
              onChange={() => {
                setHideAge(!hideAge);
                localStorage.setItem("hide_age", !hideAge);
              }}
            />
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="section">
          <h3>Notifications</h3>

          <div className="item" onClick={() => toggle("notifications")}>
            Notifications <span>›</span>
          </div>
          {open === "notifications" && (
            <div className="dropdown">
              <div className="toggle-row">
                Enable Notifications
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => {
                    setNotifications(!notifications);
                    localStorage.setItem(
                      "notifications",
                      JSON.stringify(!notifications)
                    );
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* APP EXPERIENCE */}
        <div className="section">
          <h3>App Experience</h3>
          <div className="item toggle">
            Animations
            <input
              type="checkbox"
              checked={animations}
              onChange={() => {
                setAnimations(!animations);
                localStorage.setItem(
                  "animations",
                  JSON.stringify(!animations)
                );
              }}
            />
          </div>
        </div>

        {/* DANGER */}
        <div className="section danger">
          <h3>Account Actions</h3>
          <div className="item delete"  onClick={() => handleDeleteAccount(user._id) } >Delete Account</div>
          <div className="item logout" onClick={handleLogout}>Logout</div>
        </div>
      </div>
    </div>
  );
}