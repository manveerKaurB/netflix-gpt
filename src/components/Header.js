import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from '../utils/constants';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
  signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
    navigate("/error");
  // An error happened.
  });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // sign in/ sign up
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid:uid, email:email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse");
        } else {
          // sign out
          dispatch(removeUser());
          navigate("/");
        }
      });
      // cleaning - when header components unloads/unmounts
      // unsubscribe when component unmounts (similar to unmount method in class based component)
      return () => unsubscribe();

  }, []);

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img  className="w-44" 
        src={LOGO} alt="Logo"/>
       {user && 
        <div className='flex p-2'>
        <img alt="user" className='w-12 h-12'
        src={user.photoURL} />
        <button className='font-bold text-white' onClick={handleSignOut}>(Sign out)</button>
       </div>
       }
    </div>
  )
}

export default Header