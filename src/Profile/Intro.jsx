import React from 'react'
import logo from '../assets/logo.jpg'
import './Intro.css'
import {Link} from 'react-router-dom'
const Intro = () => {
  return (
    <div className='intro'>

        <div className='intro-img'>
            <img src={logo} alt="" />
        </div>

        <div className="con">
            <div className="cona">
                <h2>
                  <Link to='/login' className='Link'> Continue with Email</Link> 
                </h2>
            </div>

             <div className="cona">
                <h2>
                    Continue with Google
                </h2>
            </div>
        </div>

        <hr />

        <div className="if">
            <p>If New  ? <Link to='/register'><span>Sign In</span></Link></p>
        </div>
      
    </div>
  )
}

export default Intro
