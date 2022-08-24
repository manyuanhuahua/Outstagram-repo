
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/navbar.css'
import homeButton from '../Images/Instagram-home-icon-on-transparent-background-PNG.png'
import uploadButton from '../Images/add+photo+plus+upload+icon-1320184050039319890.png'
import ProfileButton from './profileButton';

const NavBar = () => {
  return (
    <nav className='nav-bar'>
      <div className='div-container'>
        <div className='child-divs'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img style={{height: '30px', width: '30px'}} src={homeButton} alt='home' />
          </NavLink>
        </div>
        <div className='child-divs'>
          <img src={uploadButton} style={{height: '50px', width: '50px'}} alt='upload' />
        </div>
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        <div className='child-divs'>
          <ProfileButton/>
        </div>
        {/* <div className='child-divs'>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        {/* <div className='child-divs'>
          <LogoutButton />
        </div> */}
      </div>
    </nav>
  );
}

export default NavBar;
