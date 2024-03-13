import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APIS } from '../shared/routes';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

import { auth } from '../configs/firebase'; // Import your Firebase authentication instance
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ref } from 'firebase/storage';
import { get } from 'lodash';
import { createDataForNewUser } from '../services/firebase/UserServices/createDataForNewUser';

function UserRegistration() {
    const { userEmail } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [base64Image, setBase64Image] = useState('')

    const [isRegistered, setIsRegistered] = useState(false);

    const navigate = useNavigate();

    const checkEmailRegistered = async () => {
        try {
            // Fetch sign-in methods for the email
            const signInMethods = await fetchSignInMethodsForEmail(auth, atob(userEmail));

            // Check if sign-in methods array is empty
            if (signInMethods.length === 0) {
                // Email is not registered
                setIsRegistered(false);
                return false;
            } else {
                // Email is registered
                setIsRegistered(true);
                return true;
            }
        } catch (error) {
            // Handle error
            console.error('Error checking email registration:', error);
            return false;
        }
    };

    checkEmailRegistered();

    const handleSendRegistrationEmail = async (e) => {
        e.preventDefault();

        // Add validation logic here before sending the registration email
        if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
            toast.error('Please Enter all the Required Fields.')
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Get user object from userCredential
            const user = userCredential.user;

            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                contact: contact,
                profileImage: base64Image
            }

            const response = await createDataForNewUser(user, userData);

            if (response) {
                toast.success("User Created Succesfully. Navigating to Login..");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                toast.error("Error Creating User.");
            }

            // User registration successful
            return { success: true, message: 'User registered successfully.' };
        } catch (error) {
            // Handle error
            console.error('Error registering user:', error);
            toast.error('An error occurred. Please try again.');
            return { success: false, message: 'Error registering user. Please try again.' };
        }
    };

    useEffect(() => {
        setEmail(atob(userEmail));
    }, []);

    return (
        <div id="LogIn">
            <ToastContainer position="top-right" autoClose={5000} closeOnClick theme="light" />
            <div className="login-page">
                <div className="login-page__content" style={{ justifyContent: 'center' }}>
                    <div className="login-page__left-border" style={{ background: 'linear-gradient(rgb(202, 182, 125), rgb(31, 31, 31))' }}></div>
                    {!isRegistered ? (<div className="login-page__content-section login-page__content-section_login-form">
                        {/* Your firm banner goes here */}
                        <form className="login-page__form" onSubmit={handleSendRegistrationEmail} data-custom-attribute="addUser" style={{ width: '520px' }}>
                            <div className="login-page__form-header" style={{ textAlign: 'center' }}>
                                <p className="login-page__title">Register Yourself</p>
                                <p className="login-page__description">Register Yourself as a Claircius User!</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className="mb-3">
                                    <label className="input" style={styles.labelStyle}>
                                        <span className="input__label">First Name<span style={{ color: 'red' }}>*</span></span>
                                        <input
                                            required
                                            autoComplete="firstName"
                                            name="firstName"
                                            placeholder="Enter First Name"
                                            type="text"
                                            className="simple-input"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="input" style={styles.labelStyle}>
                                        <span className="input__label">Last Name<span style={{ color: 'red' }}>*</span></span>
                                        <input
                                            required
                                            autoComplete="lastName"
                                            name="lastName"
                                            placeholder="Enter Last Name"
                                            type="text"
                                            className="simple-input"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className="mb-3">
                                    <label className="input" style={styles.labelStyle}>
                                        <span className="input__label">Email<span style={{ color: 'red' }}>*</span></span>
                                        <input
                                            required
                                            autoComplete="email"
                                            name="email"
                                            placeholder="Enter Your Email"
                                            type="email"
                                            className="simple-input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="input" style={styles.labelStyle}>
                                        <span className="input__label">Contact</span>
                                        <input
                                            required
                                            autoComplete="contact"
                                            name="contact"
                                            placeholder="Enter Your Contact No"
                                            type="text"
                                            className="simple-input"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className="mb-3">
                                    <label className="input" style={styles.labelStyle}>
                                        <span className="input__label">Password<span style={{ color: 'red' }}>*</span></span>
                                        <input
                                            required
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="Enter Your Password"
                                            type="password"
                                            className="simple-input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    <label className="input" style={styles.labelStyle}>
                                        <span className="input__label">Confirm Password<span style={{ color: 'red' }}>*</span></span>
                                        <input
                                            required
                                            autoComplete="new-password"
                                            name="confirmPassword"
                                            placeholder="Confirm Your Password"
                                            type="password"
                                            className="simple-input"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="image-upload m-auto">
                                <div className="image-upload__header">
                                    <span className="input__label my-2 text-center">Profile Photo</span>
                                </div>
                                <div className="image-upload__profile-photo">

                                    {base64Image ?
                                        <img
                                            className="image-upload__logo-image"
                                            src={base64Image}
                                            alt="partners"
                                        /> :
                                        <img
                                            className="image-upload__logo-image"
                                            src={'https://dnhf8bus4lv8r.cloudfront.net/new-packs/assets/5bfd0c77f2db530b34c9.svg'}
                                            style={{ width: '50px', height: '50px' }}
                                            alt="partners"
                                        />}
                                    <input
                                        type="file"
                                        multiple={false}
                                        className="image-upload__file-input"
                                        accept=".png, .jpg, .jpeg"
                                        autoComplete="off"
                                        onChange={(event) => {
                                            console.log('Profile Image: ', event.target.files[0])
                                            if (event.target.files[0]) {
                                                const reader = new FileReader();

                                                reader.onloadend = () => {
                                                    // The result contains the base64 image data
                                                    const base64ImageData = reader.result;
                                                    setBase64Image(base64ImageData);
                                                    console.log(base64ImageData)
                                                };

                                                // Read the file as a data URL (base64)
                                                reader.readAsDataURL(event.target.files[0]);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="image-upload__button-set">
                                    <label type="file" className="btn btn_secondary me-2">
                                        <input
                                            type="file"
                                            multiple={false}
                                            className="image-upload__file-input"
                                            accept=".png, .jpg, .jpeg"
                                            autoComplete="off"
                                            onChange={(event) => {
                                                console.log('Profile Image: ', event.target.files[0])
                                                if (event.target.files[0]) {
                                                    const reader = new FileReader();

                                                    reader.onloadend = () => {
                                                        // The result contains the base64 image data
                                                        const base64ImageData = reader.result;
                                                        setBase64Image(base64ImageData);
                                                        console.log(base64ImageData)
                                                    };

                                                    // Read the file as a data URL (base64)
                                                    reader.readAsDataURL(event.target.files[0]);
                                                }
                                            }}
                                        />
                                        <span className="btn__text">Upload</span>
                                    </label>
                                    <span className={`btn btn_red me-2 ${base64Image ? '' : 'btn_disabled'}`} onClick={() => { setBase64Image(null) }}>
                                        <span className="btn__text">Delete</span>
                                    </span>
                                </div>
                            </div>

                            <div className="login-page__button-set d-flex justify-content-center align-items-center mb-3">
                                <button type="submit" className="btn" style={{ width: '50%' }}>
                                    <span className="btn__text">Register</span>
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
                    </div>) : (
                        <div style={{
                            textAlign: 'center',
                            fontSize: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            height: '70vh'
                        }}>
                            <div>
                                <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>You're already registered!</h1>
                            </div>
                            <div className='separator'>
                                <hr />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                margin: '18px 0'
                            }}>
                                <FontAwesomeIcon icon="fa-solid fa-circle-check" size='2xl' style={{ color: "#63E6BE", fontSize: '140px' }} />
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <h3>The User has Already been Registered!</h3>
                            </div>
                            <div>
                                <Link to={'/'}>
                                    <button>Back to Login</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    labelStyle: {
        width: '240px'
    }
}

export default UserRegistration;
