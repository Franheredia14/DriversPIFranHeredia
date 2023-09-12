import React from "react"
import { Link } from "react-router-dom"
import '../landing/landing.css'
import '../../assets/drivers-img/drivers.jpg'

function Landing() {
    return (
        <div className="background-container">
          <h1>Welcome Drivers!</h1>
          <div className="home-button-container">
            <Link to="/home">
              <button className="home-button">Home</button>
            </Link>
          </div>
        </div>
    );
  }

export default Landing;