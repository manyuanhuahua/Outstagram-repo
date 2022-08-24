import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import icon from '../Images/profile-icon-20.jpeg'
import LogoutButton from "./auth/LogoutButton";


function ProfileButton() {

  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user)


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
      <span style={{ color: '#cccccc', padding: '0 6px' }}>
        <img style={{ height: '25px', width: '25px', borderRadius: '50%' }} src={sessionUser.profile_image} alt='icon' />
      </span>
      <div className="dropdown-content">
        <button className="logOutButton" style={{ cursor: 'pointer' }}>
          <img style={{ height: '15px', width: '15px', marginRight: '5px' }} src={sessionUser.profile_image} alt='icon' />
          Profile
        </button>
        <div><LogoutButton /></div>
      </div>
    </div>
  )
}

export default ProfileButton;
