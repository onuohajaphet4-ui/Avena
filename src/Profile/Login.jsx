import React, { useState } from "react";
import axios from "axios";
import { CircularProgress , IconButton} from "@mui/material";
import { useNavigate ,Link} from "react-router-dom";
import './Register.css'
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined } from "@mui/icons-material";
const Register = () => {
  const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "https://avena-backend.onrender.com/api/user/login",
        formData
      );

      const {token,user} = res.data
      localStorage.setItem("token",token);
      localStorage.setItem('user', JSON.stringify(user))
      navigate("/home")
      console.log(user)
      console.log(token)
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className='register'>
      <h1>Login to your account</h1>

      {error && <p>{error?.response?.data?.error}</p>}

      

      <form >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required

        />

        <br /> 
        <br />

        <div className="password-wrapper">
  <input

    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter Password"
    className="password-input"
  />

  <IconButton
    type="button"
    className="toggle-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <VisibilityOff /> : <Visibility />}
  </IconButton>
</div>

        

        <br /> <br />

       

        <button onClick={handleLogin} disabled={loading} className="reg-button">
          {loading ? (
            <CircularProgress size={24} sx={{ color: "black" }} />
          ) : (
            "Next"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;