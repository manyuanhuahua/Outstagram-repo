import React, { useState, useEffect } from "react";
import icon from '../Images/profile-icon-20.jpeg'
import LogoutButton from "./auth/LogoutButton";


function ProfileButton() {

  const [showMenu, setShowMenu] = useState(false);


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);



    return (
      <div className="dropdown navLink">
      <span style={{color: '#cccccc', padding: '0 6px'}}>
      <img style={{height: '25px', width: '25px'}} src={icon} alt='icon'/>
      </span>
      <div className="dropdown-content">
        <button className="logOutButton">
        <img style={{height: '15px', width: '15px', marginRight: '5px'}} src={icon} alt='icon'/>
            Profile
        </button>
        <div><LogoutButton/></div>
      </div>
      </div>
    )
}

export default ProfileButton;
