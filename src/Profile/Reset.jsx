
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, EmailOutlined, LockOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {motion} from 'framer-motion'



const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const{token} = useParams()

  const handleChange = (e) =>

    
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `https://avena-backend.onrender.com/api/user/reset-password/${token}`,
        formData
      );

       alert("Password has been succesfully resetted");
      navigate("/login");

      
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className='register'>
          <h1>Change Password<span style={{ color: " #ff4fa8" , marginLeft:'10px'}}>.</span></h1>
    
          {error && <p>{error?.response?.data?.error}</p>}
    
          
    
          <form >
            
    
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
    
           
    
            <button onClick={handleLogin} disabled={loading} className="reg-button" style={{marginBottom:'100px'}}>
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

export default Login;