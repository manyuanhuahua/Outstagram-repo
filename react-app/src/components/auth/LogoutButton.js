import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import '../../styles/navbar.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='logOutButton' style={{ cursor: 'pointer' }} onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
