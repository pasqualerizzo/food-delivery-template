import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { validateUserJWTToken } from './api';
import { app } from './config/firebase.config';
import { Main, Login, Dashboard } from "./containers";
import { setUserDetails } from './context/actions/userActions';
import { motion } from 'framer-motion';
import { fadeInOut } from './animations';
import { Alert, MainLoader } from './components';


const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setisLoading] = useState(false);
  const alert = useSelector(state => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setisLoading(false);
      }, 3000);
    });   
  }, [])
  
  return (
    <div className='w-scren min-h-screen h-auto flex flex-col items-center justify-center'>
      {isLoading && (
        <motion.div 
        {...fadeInOut} 
        className='fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full'
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
          <Route path='/*' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard/*' element={<Dashboard />} />

      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  )
}

export default App
