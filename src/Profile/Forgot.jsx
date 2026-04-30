
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
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import {motion} from 'framer-motion'




const Login = () => {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //  const{token} = useParams()
  

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
  setLoading(true);
  setError("");

  try {
    const res = await axios.post(
      "https://avena-backend.onrender.com/api/user/reset-password",
      { email: formData.email }
    );

    const token = res.data.token;

    if (!token) {
      setError("Token not generated");
      return;
    }

    navigate(`/reset-password/${token}`);

  } catch (err) {
    setError(err?.response?.data?.message || "Request failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div  className='register'>
          <h1> Enter Email<span style={{ color: " #ff4fa8" , marginLeft:'10px'}}>.</span></h1>
    
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
    
           
            
    
            <br /> <br />
    
           
    
            <button onClick={handleLogin} disabled={loading} className="reg-button" style={{marginBottom:'80px'}}>
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