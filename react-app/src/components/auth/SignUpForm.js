import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../../styles/LoginForm.css';
import logo from '../../Images/Outstagram-text-login.png';
import { getAllUsers } from '../../store/session';
import UsersList from '../UsersList';
import User from '../User';
import Slideshow from './SlideShowImages/Slideshow';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [passwordShown, setPasswordShown] = useState(false);
  // const [showPasswordText, setShowPasswordText] = useState('Show' || 'hide')
  // const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);
  // const [repeatShowPasswordText, setRepeatShowPasswordText] = useState('Show' || 'hide')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers)
  }, [dispatch])


  // useEffect(() => {
  //   let errors = [];
  //   // if (UsersList.includes(username)) errors.push("username taken")
  //   if (!username && username.length < 1 || username.length > 40) errors.push("Please enter a username of valid length")
  //   if (!email && email.length < 7 && email.length < 255) errors.push("Please enter an email")
  //   if (!email.includes("@") || !email.includes(".")) errors.push("Email must be valid")
  //   if (!fullname) errors.push("Please enter your name")
  //   if (!password) errors.push("Please enter a password")
  //   if (!repeatPassword) errors.push("Please repeat your password")
  //   setErrors(errors)
  // }, [username, email, fullname, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    let errors = [];
    // if (UsersList.includes(username)) errors.push("username taken")
    if (!username && username.length < 1 || username.length > 40) errors.push("Please enter a username of valid length")
    if (!email && email.length < 7 && email.length < 255) errors.push("Please enter an email")
    if (!email.includes("@") || !email.includes(".")) errors.push("Email must be valid")
    if (!fullname) errors.push("Please enter your name")
    if (!password) errors.push("Please enter a password")
    if (!repeatPassword) errors.push("Please repeat your password")
    setErrors(errors)
    if (errors.length > 0) return setErrors;
    if (password === repeatPassword) {
      setErrors([]);
      const data = await dispatch(signUp(username, fullname, email, password));
      if (data) {
        setErrors(data)
      }
    }
    else {
      return setErrors(['Passwords Must Match'])
    }
  };

  const demoLogIn = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  // const togglePassword = (e) => {
  //   e.preventDefault();
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   setPasswordShown(!passwordShown);
  //   setShowPasswordText(!showPasswordText)
  // };

  // const togglePassword2 = (e) => {
  //   e.preventDefault();
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   setRepeatPasswordShown(!repeatPasswordShown);
  //   setRepeatShowPasswordText(!repeatShowPasswordText)
  // };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }



  return (
    <div className={'login-form-whole-container'} style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {/* <img src={'https://cdn.iphoneincanada.ca/wp-content/uploads/2019/10/instagram-dark-mode.jpg'} style={{ marginRight: '125px' }} /> */}
      <div className={'iphone-carousel-div'} style={{ width: '600px', height: '800px', position: 'fixed', left: '10vw', top: '22%', marginLeft: '200px' }}>
        <Slideshow a />
      </div>
      <div className='login-form-container-div'>
        <form onSubmit={onSignUp} className='login-form-wrapper'>
          <img src={logo} alt="outstagram-text" className='outstagram-logo-text' style={{ marginBottom: '25px' }} />
          <div className='text-div-sign-up'>
            Sign up to see photos from your friends.
          </div>
          <div style={{ marginBottom: '8px' }}>
            {errors.map((error, ind) => (
              <div style={{ textAlign: 'center', color: 'red', fontSize: '12px' }} key={ind}>{error}</div>
            ))}
          </div>
          <div className='input-wrapper-div'>
            <label style={{ width: '210px', padding: '2px' }} className='password-form-label'>User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}

            ></input>
          </div>
          <div className='input-wrapper-div'>
            <label style={{ width: '210px', padding: '2px' }} className='password-form-label'>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}

            ></input>
          </div>
          <div className='input-wrapper-div'>
            <label style={{ width: '210px', padding: '2px' }} className='password-form-label'>Full Name</label>
            <input
              type='text'
              name='fullname'
              onChange={updateFullname}
              value={fullname}

            ></input>
          </div>
          <div className='input-wrapper-div'>
            <label style={{ width: '210px', padding: '2px' }} className='password-form-label'>Password</label>
            {/* {password && <button className="show-password-button" onClick={togglePassword}>{showPasswordText ? 'Show' : 'Hide'}</button>} */}
            <input
              type={"password"}
              name='password'
              onChange={updatePassword}
              value={password}
              autoComplete="new-password"

            ></input>
          </div>
          <div className='input-wrapper-div'>
            <label style={{ width: '210px', padding: '2px' }} className='password-form-label'>Repeat Password</label>
            {/* {repeatPassword && <button className="show-password-button" onClick={togglePassword2}>{repeatShowPasswordText ? 'Show' : 'Hide'}</button>} */}
            <input
              type={"password"}
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              autoComplete="new-password"

            ></input>
          </div>
          <div>
            <button type='submit' className='login-button'>Sign Up</button>
          </div>
          {/* <div>
            <button onClick={() => demoLogIn()} className='login-button'>Demo User Log In</button>
          </div> */}
        </form>
        <div className='signup-button-loginform-container'>
          <label style={{ marginRight: '4px' }}>Have an account?</label>
          <NavLink to='/login' exact={true} className='signup-link-login-form'>
            Log In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
