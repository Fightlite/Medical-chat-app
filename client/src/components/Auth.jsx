import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [ isSignup, setIsSignup] = useState(true);
    const [ form, setForm] = useState(initialState);

    const handleChange = (e) =>{
        setForm({...form, [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'https://medical-pager-2021.herokuapp.com/auth';

        //post all the data to the back-end then get some data back from the back-end
        const { data: { token, userId, fullName, hashedPassword }} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, { username, password, fullName: form.fullName, phoneNumber, avatarURL })
        
        //save everything on the cookies
        cookies.set( 'token', token);
        cookies.set( 'username', username);
        cookies.set( 'fullName', fullName);
        cookies.set( 'userId', userId);

        if(isSignup) {
            cookies.set( 'phoneNumber', phoneNumber);
            cookies.set( 'avatarURL', avatarURL);
            cookies.set( 'hashedPassword', hashedPassword);
        }

        window.location.reload();
    }


    const switchMode = () =>{
        // setIsSignup(!isSignup);
        setIsSignup((prevIsSignup) => !prevIsSignup);

    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input
                                    name="password"
                                    type="text"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="text"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button type="submit">
                                {isSignup? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>{isSignup? "Already have an account?" : "Dont't have an account?"}</p>
                        <span onClick={switchMode}>{isSignup? "Sign In" : "Sign Up"}</span>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in"/>
            </div>
        </div>
    )
}

export default Auth