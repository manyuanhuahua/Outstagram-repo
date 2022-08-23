import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../../styles/LoginForm.css';
import logo from '../../Images/Outstagram-text-login.png';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState('Show' || 'hide')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  // Password toggle handler
  const togglePassword = (e) => {
    e.preventDefault();
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
    setShowPasswordText(!showPasswordText)
  };

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
    <div>
      <div className='login-form-container-div'>
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
              {password && <button className="show-password-button" onClick={togglePassword}>{showPasswordText ? 'Show' : 'Hide'}</button>}
              <input
                // style={{ width: '210px', maxWidth: '220px', overflowX: 'auto' }}
                name='password'
                type={passwordShown ? "text" : "password"}
                value={password}
                onChange={updatePassword}
                required
              />
            </div>
            <div>
              <button type='submit' className='login-button'>Log In</button>
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
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
