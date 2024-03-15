import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import LoginInputs from '../components/LoginComponent/LoginInputs';
import ResetPasswordInputs from '../components/LoginComponent/ResetPasswordInputs';
import { auth } from '../configs/firebase';
import { setLocalStorage } from '../services/localStorage';
import { LOCAL_STORAGE } from '../shared/constant';
import { useTranslation } from 'react-i18next';
import { APIS } from '../shared/routes';

function RegistrationEmail() {
    const { t } = useTranslation()

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSendRegistrationEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(APIS.sendRegistrationEmail, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            const json = await response.json();

            if (json.success) {
                toast.success('Email Sent Successfully.')
                console.log('Email sent successfully');
            } else {
                toast.error('Failed to send email!')
                console.error('Failed to send email!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        // Your logic for sending registration email goes here
    };

    return (
        <div id="LogIn">
            <ToastContainer pauseOnHover={false} position="top-right" autoClose={5000} closeOnClick theme="light" />
            <div className="login-page">
                <div className="login-page__content" style={{ justifyContent: 'center' }}>
                    <div className="login-page__left-border" style={{ background: 'linear-gradient(rgb(202, 182, 125), rgb(31, 31, 31))' }}></div>
                    <div className="login-page__content-section login-page__content-section_login-form">
                        <div className="login-page__firm-banner">{/* Your firm banner goes here */}</div>
                        <form className="login-page__form" onSubmit={handleSendRegistrationEmail} data-custom-attribute="addUser">
                            <div className="login-page__form-header" style={{ textAlign: 'center' }}>
                                <p className="login-page__title">{t("RegistrationEmail.addNewUser")}</p>
                                <p className="login-page__description">{t("RegistrationEmail.sendLink")}</p>
                            </div>
                            <div className="mb-3">
                                <label className="input">
                                    <span className="input__label">{t("RegistrationEmail.newEmail")}</span>
                                    <input
                                        required
                                        autoComplete="email"
                                        name="email"
                                        placeholder={t("RegistrationEmail.newEmailPlaceholder")}
                                        type="text"
                                        className="simple-input"
                                        id="myInput"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="login-page__button-set">
                                <button type="submit" className="btn btn_wide">
                                    <span className="btn__text">{t("RegistrationEmail.sendEmail")}</span>
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
                </div>
            </div>
        </div>
    );
}

export default RegistrationEmail;
