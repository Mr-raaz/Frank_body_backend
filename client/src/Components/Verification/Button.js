import React, { useState } from "react";
import "./Button.css";

const Button = () => {
  const [changeName,setChangeName]=useState(false);
  const [changeClass,setChangeClass]=useState("add-btn");
  let btn=document.getElementById("btn");
  
 const handleClick=()=>{
  setChangeName(true);
  setChangeClass("active_btn")
  }

  return (
    <div class="hero_btn">
        <button className={changeClass} onClick={handleClick}>
           <p className="btn_txt">{changeName ? "Submit" : "Thanks"}</p>
           <div className="cart-check-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
                <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
             </svg>
        </div>
        </button>

    </div>
  );
};

export default Button;
