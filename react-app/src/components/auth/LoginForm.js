import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../../styles/LoginForm.css';
import logo from '../../Images/Outstagram-text-login.png';
import iphonePng from '../../Images/apple-iphone-13-2021-medium.png'
// import Carousel from './Carousel';
import Slideshow from './SlideShowImages/Slideshow';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [passwordShown, setPasswordShown] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState('Show' || 'hide')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {
    let errors = [];
    if (!email && email.length < 7 && email.length < 255) errors.push("Please enter an email")
    if (!email.includes("@") || !email.includes(".")) errors.push("Email must be valid")
    if (!password) errors.push("Please enter a password")
    setErrors(errors)
  }, [email, password])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogIn = () => {
    setEmail('demo@aa.io')
    setPassword('password')

  }

  // Password toggle handler
  // const togglePassword = (e) => {
  //   e.preventDefault();
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   setPasswordShown(!passwordShown);
  //   setShowPasswordText(!showPasswordText)
  // };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/' />;
  }


  // const handleDemo = () => {
  //   const credential = 'demo@user.io'
  //   const password = 'password'
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(() => history.push('/images'))
  // }


  return (
    <div className={'login-form-whole-container'} style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {/* <img src={iphonePng} style={{ height: '750px', width: '352px', marginRight: '100px', zIndex: '1' }} /> */}
      <div className={'iphone-carousel-div'} style={{ width: '600px', height: '800px', position: 'fixed', left: '10vw', top: '22%', marginLeft: '200px' }}>
        <Slideshow a />
      </div>
      {/* <img src={'https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png'} alt='iPhone' style={{ marginRight: '125px' }} /> */}
      <div className='login-form-container-div' style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* <Carousel /> */}
        </div>
        <form onSubmit={onLogin} className='login-form-wrapper'>
          <img src={logo} alt="outstagram-text" className='outstagram-logo-text' />
          <div className='input-wrapper-div'>
            <label style={{ width: '210px', padding: '2px' }} className='password-form-label'>Email</label>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
          <div>
            <div className='input-wrapper-div'>
              <label style={{ width: '210px', padding: '2px' }} className='password-form-label'>Password</label>
              {password && <button className="show-password-button" ></button>}
              <input
                // style={{ width: '210px', maxWidth: '220px', overflowX: 'auto' }}
                name='password'
                type="password"
                // placeholder='Password'
                value={password}
                onChange={updatePassword}
                required
              />
            </div>
            <div>
              <button type='submit' className='login-button'>Log In</button>
            </div>
            <div>
              <button onClick={() => demoLogIn()} className='login-button'>Demo User Log In</button>
            </div>
            <div style={{ marginTop: '12px' }}>
              {errors.map((error, ind) => (
                <div style={{ textAlign: 'center', color: 'red', fontSize: '12px' }} key={ind}>{error}</div>
              ))}
            </div>
          </div>
        </form>
        <div className='signup-button-loginform-container'>
          <label style={{ marginRight: '4px' }}>Don't have an account?</label>
          <NavLink to='/sign-up' exact={true} className='signup-link-login-form'>
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
