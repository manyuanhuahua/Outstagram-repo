
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import '../styles/navbar.css'
import homeButton from '../Images/instagram-home-icon.png'
import uploadButton from '../Images/upload-image-icon-instagram.svg'
import ProfileButton from './profileButton';
import logo from '../Images/Outstagram-text-login.png';
import CreatePostModal from './modals/CreatePostModal';

const NavBar = () => {
  const [createModal, setCreateModal] = useState(false);



  return (
    <nav className='nav-bar'>
      <NavLink to="/" style={{width:'50%'}}>
        <img src={logo} style={{ height: '40px', position: 'relative', marginLeft:'250px'}} />
      </NavLink>
      <div className='div-container'>
        <div className='child-divs'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img style={{ height: '30px', width: '30px', cursor: 'pointer' }} src={homeButton} alt='home' />
          </NavLink>
        </div>
        <div className='child-divs'>
          <div onClick={() => setCreateModal(true)}>
            <img src={uploadButton} style={{ height: '50px', width: '50px', cursor: 'pointer' }} alt='upload' />
          </div>
          {createModal && <CreatePostModal setShowModal={setCreateModal} />}

        </div>

        <div className='child-divs' style={{ cursor: 'pointer' }}>
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
