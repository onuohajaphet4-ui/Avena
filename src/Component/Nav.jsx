import React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'
import { FaHome, FaStore, FaUser, FaHeart } from "react-icons/fa";
import logo from '../assets/logo.jpg'
import {useNavigate} from 'react-router-dom'
import { FaMessage } from 'react-icons/fa6';
import { FiHeart, FiHome, FiLogOut, FiMail, FiMessageCircle, FiShoppingCart, FiUser } from 'react-icons/fi'
const Home = () => {
  const navigate = useNavigate();

  const handleAccountClick = () => {
  console.log("CLICKED"); // 👈 add this
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    navigate("/log");
    return;
  }

  if (user?.role === "admin") {
    navigate("/admin");
  } else {
    navigate("/customer");
  }
};

  return (

    <div>
    <div className='nav'>
      <div className="logo">
       
       <img src={logo} alt="" />

        <div className="hello">
          <h4>Hello,<span>User</span></h4>
          <p>Welcome to <span>AveNa</span></p>
        </div>
      </div>

  
        <ul>
         <Link to='/home' style={{textDecoration:'none', color:'inherit'}}> <li> <FiHome size={23} className='iconb'/><span>Home</span></li></Link>
           <Link to='/like' style={{textDecoration:'none', color:'inherit'}}> <li> <FaStore size={20} className='iconb'/><span>Product</span></li></Link>
           <Link to='/chat' style={{textDecoration:'none', color:'inherit'}}> <li><FiHeart size={23} className='iconb'/><span>Like</span></li></Link>
           <Link to='/chat' style={{textDecoration:'none', color:'inherit'}}> <li><FiMessageCircle size={23} className='iconb'/><span>Chat</span></li></Link>
           <Link to='/profile' style={{textDecoration:'none', color:'inherit'}}> <li><FiUser size={23} className='iconb'/><span>Profile</span></li></Link>
           
        </ul>

       
    </div>

    <div className="smallnav">

      <ul>
           <Link to='/home' style={{textDecoration:'none', color:'inherit'}}> <li> <FiHome size={23} className='iconb'/><span>Home</span></li></Link>
           <Link to='/like' style={{textDecoration:'none', color:'inherit'}}> <li> <FaStore size={23} className='iconb'/><span>Product</span></li></Link>
           <Link to='/like' style={{textDecoration:'none', color:'inherit'}}> <li> <FiHeart size={23} className='iconb'/><span>Like</span></li></Link>
           <Link to='/chat' style={{textDecoration:'none', color:'inherit'}}> <li><FiMessageCircle size={23} className='iconb'/><span>Chat</span></li></Link>
           <Link to='/profile' style={{textDecoration:'none', color:'inherit'}}> <li><FiUser size={23} className='iconb'/><span>Profile</span></li></Link>
           
        
        </ul>


    </div>


    </div>
  )
}

export default Home
