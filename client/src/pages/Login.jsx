// ** Import Dependecies
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// ** Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebase';

// ** Custom Component
import LoginInputs from '../components/LoginComponent/LoginInputs';
import { ToastContainer} from 'react-toastify';
import ResetPasswordInputs from '../components/LoginComponent/ResetPasswordInputs';

const SCREEN_MODES = {
  LOGIN: 'login',
  RESET_PASSWORD: "resetPassword"
}

function Login() {
  const [mode, setMode] = useState(SCREEN_MODES.LOGIN)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState("")
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const submittedOn = e.target.getAttribute("data-custom-attribute")
    if (submittedOn === SCREEN_MODES.LOGIN){
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate('/categories');
        })
        .catch((error) => {
          console.error('Login error:', error);
        })
    } else {
      console.log(resetEmail)
    } 
  };

  const handleModeSwitch = () => {
    setEmail("")
    setPassword("")
    setResetEmail("")
    setMode(mode === SCREEN_MODES.LOGIN ? SCREEN_MODES.RESET_PASSWORD : SCREEN_MODES.LOGIN )
  }

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
            <form className="login-page__form" onSubmit={handleLogin} data-custom-attribute={mode === SCREEN_MODES.LOGIN ? SCREEN_MODES.LOGIN : SCREEN_MODES.RESET_PASSWORD}>
              <div className="login-page__form-header">
                <p className="login-page__title">{mode === SCREEN_MODES.LOGIN ? "Log In" : "Reset Password"}</p>
                {mode === SCREEN_MODES.LOGIN && <p className="login-page__description">Let's start creating custom marketing!</p>}
              </div>
              {mode === SCREEN_MODES.LOGIN && <LoginInputs email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>}
              {mode === SCREEN_MODES.RESET_PASSWORD && <ResetPasswordInputs resetEmail={resetEmail} setResetEmail={setResetEmail}/>}
              <div className="login-page__button-set">
                <button type="submit" className="btn btn_wide" >
                  <span className="btn__text">{mode === SCREEN_MODES.LOGIN ? "Log In" : "Reset Password"}</span>
                </button>
                <button type="button" className="btn btn_transparent btn_wide" onClick={handleModeSwitch}>
                {mode === SCREEN_MODES.RESET_PASSWORD && 
                  <svg className="icon v1-icon v1-icon-chevron-left-light">
                    <use
                      href="#v1-icon-chevron-left-light"
                      xlinkHref="#v1-icon-chevron-left-light"
                    />
                  </svg>}
                  <span className="btn__text">{mode === SCREEN_MODES.LOGIN
                   ? 
                   "Forgot Password?"
                   :
                    "Back to Log In"}</span>
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

