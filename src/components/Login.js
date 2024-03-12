import React, { useRef, useState } from 'react'
import Header from './Header';
import {checkValidData} from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {USER_AVATAR} from "../utils/constants";
const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
   const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    }
    const handleButtonClick = () => {
        // validate form data
        const message = setErrorMessage(checkValidData(isSignInForm, email.current.value, password.current.value, name?.current?.value));
        if(message) return;
        // sign in/ sign up
        if(!isSignInForm) {
            // sign up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
              .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                  // update profile (add user name)
                updateProfile(user, {
                  displayName: name.current.value, photoURL: USER_AVATAR
                }).then(() => {
                  const {uid, email, displayName, photoURL} = auth.currentUser;
                  dispatch(addUser({uid:uid, email:email, displayName: displayName, photoURL: photoURL}));
                }).catch((error) => {
                  // An error occurred
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setErrorMessage(errorCode + "-" + errorMessage);
                });
                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage);
                // ..
              });
        }
        else {
            // sign in
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
        });

        }
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="netflixBackground"/>
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-32 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold font-3xl py-4'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
            { !isSignInForm && (
                 <input ref={name} type="text" placeholder='full Name' className='p-4 my-4 w-full bg-gray-700'/>
            )
            }
            <input ref={email} type="text" placeholder='Email address' className='p-4 my-4 w-full bg-gray-700'/>
            <input ref={password} type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700'/>
            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? 'Are you new to Netflix? Sign Up now!' : 'Already registered? Sign In now!'}</p>
        </form>
    </div>
  )
}

export default Login;