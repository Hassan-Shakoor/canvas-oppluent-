import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebase';
import { useNavigate } from "react-router-dom";
import { ToastContainer} from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        // Redirect the user to the desired page
        // e.g., history.push('/categories');
         // Redirect the user to the desired page
      
        navigate('/categories');
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
      });
  };

  return (
    <div id="LogIn">
    <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme='light'/>
      <div className="login-page">
        <div className="login-page__content">
          <div
            className="login-page__left-border"
            style={{ background: 'linear-gradient(rgb(202, 182, 125), rgb(31, 31, 31))' }}
          ></div>
          <div className="login-page__content-section login-page__content-section_login-form">
            <div className="login-page__firm-banner">
              <img src="images/login_logo.png" alt="account logo" className="login-page__account-logo" />
            </div>
            <form className="login-page__form" onSubmit={handleLogin}>
              <div className="login-page__form-header">
                <p className="login-page__title">Log In</p>
                <p className="login-page__description">Let's start creating custom marketing!</p>
              </div>
              <div className="mb-3">
                <label className="input">
                  <span className="input__label">Email</span>
                  <input
                    autoComplete="email"
                    name="email"
                    placeholder="Enter your email"
                    type="text"
                    className="simple-input"
                    id="myInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div className="mb-3">
                <div className="password-input">
                  <label className="input">
                    <span className="input__label">Password</span>
                    <input
                      autoComplete="password"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      id="myInput"
                      className="simple-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="password-input__icon-wrapper">
                      <svg className="icon v1-icon v1-icon-eye password-input__icon">
                        <use href="#v1-icon-eye"></use>
                      </svg>
                    </span>
                  </label>
                </div>
              </div>
              <div className="login-page__button-set">
                <button type="submit" className="btn btn_wide">
                  <span className="btn__text">Log In</span>
                </button>
                <button type="button" className="btn btn_transparent btn_wide">
                  <span className="btn__text">Forgot Password?</span>
                </button>
              </div>
            </form>
            <div className="login-page__external-links">
              <a
                className="btn btn_link login-page__external-link"
                href="https://www.maxadesigns.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn__text">Privacy</span>
              </a>
              &nbsp;&amp;&nbsp;
              <a
                className="btn btn_link login-page__external-link"
                href="https://www.maxadesigns.com/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn__text">Terms</span>
              </a>
            </div>
          </div>
          <div className="login-page__content-section">
            <img src="images/login_image.png" className="login-page__image" alt="interface example" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

