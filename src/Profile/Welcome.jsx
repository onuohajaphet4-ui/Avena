import React from 'react'
import logo from '../assets/logo.jpg'
import './Welcome.css'
import {Link} from 'react-router-dom'
const Welcome = () => {
  return (
    <div className="welcome">

        <div>
            <img src={logo} alt="" />
        </div>

        <div className="welcome-into">
            <h1>
                Welcome to Arena
            </h1>

            <p>
                Please follow these House Rules .
            </p>
        </div>

        <div className="welcome-end">
            <h3>
                Be Yourself
            </h3>

            <p>
                Make sure you are not impersonating any body, your information should be true .
            </p>
        </div>

        <div className="welcome-end">
            <h3>
                Play it cool
            </h3>

            <p>
               Be respectful as possible to people and treated them how you will like to be treated .
            </p>
        </div>

        <div className="welcome-end">
            <h3>
               Stay safe
            </h3>

            <p>
                Dont be to Quick to give out all your personal information . 
            </p>
        </div>

        <div className="welcome-end">
            <h3>
                Be proactive
            </h3>

            <p>
               Always report bad behavior .
            </p>
        </div>

        <div>
            <button>
              <Link to='/name' style={{textDecoration:'none', color:'inherit'}}> I agree  </Link> 
            </button>
        </div>







      
    </div>
  )
}

export default Welcome
