import { Link } from "react-router-dom";
import React from "react";
import img1 from '../images/pic.PNG'
const Landingscreen = () => {

  return (
   
    <div className="row landing justify-content-center" style={{backgroundImage: `url(${img1})`}}>
      <div className=" col-md-9 my-auto text-center" style={{borderRight:"8px solid white "}}>
     
        <h2 style={{color:"white",fontSize:"100px"}}>DIAMOND</h2>
        <h1 style={{color:"white"}}>"There is only one boss.The Guest</h1>

        <Link to="/home">
          <button className="btn  landing-btn">Get Started</button>
        </Link>
      </div>
   
    </div>
  
  );
};

export default Landingscreen;
