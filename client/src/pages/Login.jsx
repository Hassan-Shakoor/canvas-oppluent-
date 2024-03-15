// ** Library
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// ** Firebase
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

// ** Custom Component
import LoginInputs from '../components/LoginComponent/LoginInputs';
import { ToastContainer } from 'react-toastify';
import ResetPasswordInputs from '../components/LoginComponent/ResetPasswordInputs';

// ** Configs
import { auth } from '../configs/firebase';

// ** Services
import { setLocalStorage } from '../services/localStorage';
import { useTranslation } from 'react-i18next';

// ** Constant
import { LOCAL_STORAGE } from '../shared/constant';

const SCREEN_MODES = {
  LOGIN: 'login',
  RESET_PASSWORD: "resetPassword"
}

function Login() {

  const { t } = useTranslation()

  const [mode, setMode] = useState(SCREEN_MODES.LOGIN)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState("")
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (mode === SCREEN_MODES.LOGIN) {
      if (!email || !password) {
        toast.error(t('Login.emailRequiredError'))
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setLocalStorage(LOCAL_STORAGE.USER_DATA, {
              uid: user.uid,
              email: user.email,
            })
            navigate('/categories');
          })
          .catch((error) => {
            toast.error(t('Login.invalidEmailError'))
            console.log(error)
          })
      }
    } else {
      if (!resetEmail.trim()) {
        toast.error(t('Login.enterValidEmail'));
        return;
      }

      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          toast.success(t('Login.passwordResetToast'));
        })
        .catch((error) => {
          toast.error(t('Login.errorOccuredToast'));
        });
    }
  };

  const handleModeSwitch = () => {
    setEmail("")
    setPassword("")
    setResetEmail("")
    setMode(mode === SCREEN_MODES.LOGIN ? SCREEN_MODES.RESET_PASSWORD : SCREEN_MODES.LOGIN)
  }

  return (
    <div id="LogIn">
      <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme='light' />
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
                <p className="login-page__title">{mode === SCREEN_MODES.LOGIN ? t('Login.login') : t('Login.resetPassword')}</p>
                {mode === SCREEN_MODES.LOGIN && <p className="login-page__description">{t('Login.heading')}</p>}
              </div>
              {mode === SCREEN_MODES.LOGIN && <LoginInputs email={email} setEmail={setEmail} password={password} setPassword={setPassword} />}
              {mode === SCREEN_MODES.RESET_PASSWORD && <ResetPasswordInputs resetEmail={resetEmail} setResetEmail={setResetEmail} />}
              <div className="login-page__button-set">
                <button type="submit" className="btn btn_wide">
                  <span className="btn__text">{mode === SCREEN_MODES.LOGIN ? t('Login.login') : t('Login.resetPassword')}</span>
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
                    t('Login.forgotPasswork')
                    :
                    t('Login.backToLogin')}</span>
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
                <span className="btn__text">{t('Login.privacy')}</span>
              </a>
              &nbsp;&amp;&nbsp;
              <a
                className="btn btn_link login-page__external-link"
                href="https://www.maxadesigns.com/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn__text">{t('Login.terms')}</span>
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

