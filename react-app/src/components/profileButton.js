import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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
      {/* <span style={{ color: '#cccccc', padding: '0 6px' }}> */}
        <img className="profile-dropdown-image" style={{ height: '25px', width: '25px', borderRadius: '50%' }} src={sessionUser.profile_image} alt='icon' />
      {/* </span> */}
      <div className="dropdown-content">
        <button className="logOutButton" style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <NavLink to={`/users/${sessionUser.id}/posts`} exact={true} style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }}>
              <img style={{ height: '20px', width: '20px', marginRight: '5px', borderRadius: '50%' }} src={sessionUser.profile_image} alt='icon' />
              <div style={{ fontWeight: '600', color: 'black', textDecoration: 'none', marginLeft: '5px',marginTop:'2px' }}>Profile</div>
            </NavLink>
          </div>

        </button>
        <div><LogoutButton /></div>
      </div>
    </div>
  )
}

export default ProfileButton;
