import React, { useEffect } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGTPSearchView } from '../utils/gtpSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGTPSearch = useSelector(store=> store.gpt.showGTPSearch);
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

  const handleGTPSearchClick = () => {
    // toggle GTP search
    dispatch(toggleGTPSearchView());
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
        <img  className="w-44 mx-auto md:mx-0" 
        src={LOGO} alt="Logo"/>
       {user && 
        <div className='flex justify-between p-2 m-2'>
          {showGTPSearch && 
              <select className='p-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
                  {SUPPORTED_LANGUAGES.map((lang) =>  <option kay={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
              </select>
          }
          <button className='py-2 px-4 my-2 mx-4 bg-purple-800 text-white rounded-lg'
          onClick={handleGTPSearchClick}>{showGTPSearch ? 'Homepage': 'GPT Search'}</button>
        <img alt="user" className='w-12 h-12 hidden md:block'
        src={user.photoURL} />
        <button className='font-bold text-white' onClick={handleSignOut}>(Sign out)</button>
       </div>
       }
    </div>
  )
}

export default Header