import React, { useState } from 'react';
import { LoginBg, Logo } from "../assets";
import { LoginInput } from '../components';
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion"
import { buttonClick } from '../animations';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { app } from "../config/firebase.config"

const Login = () => {

  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => (
            console.log(token)
          ));
        }
      });
    });
  };

  return (
  <div className='w-screen h-screen relative overflow-hidden flex'>

      {/* Background Image */}
      <img 
        src={LoginBg} 
        className='w-full h-full object-cover absolute top-0 left-0' 
        alt="bg-image" 
      />

      {/* Content Box */}
      <div className='flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6'>

          {/* Logo Top */}
          <div className='flex items-center justify-start gap-4 w-full'>
            <img src={Logo} className='w-8' alt="logo" />
            <p className='text-headingColor font-semibold text-2xl'>Cittá</p>
          </div>

          {/* Welcome text */}
          <p className='text-3xl font-semibold text-headingColor'>
            Benvenuto
          </p>

          <p className=' text-xl text-textColor -mt-6'>
            {isSignUp ? "Registrati" : "Accedi"}
          </p>

          {/* Input Section */}
          <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">

            <LoginInput 
            placeHolder={"Inserisci La Tua Mail"} 
            icon={<FaEnvelope className='text-xl text-textColor' />}
            inputState={userEmail} 
            inputStateFunc={setUserEmail} 
            type="email" 
            isSignUp={isSignUp} 
            />

            <LoginInput 
            placeHolder={"Inserisci La Password"} 
            icon={<FaLock className='text-xl text-textColor' />}
            inputState={password} 
            inputStateFunc={setPassword} 
            type="password" 
            isSignUp={isSignUp} 
            />

            {isSignUp && (
              <LoginInput 
              placeHolder={"Conferma La Password"} 
              icon={<FaLock className='text-xl text-textColor' />}
              inputState={confirm_password} 
              inputStateFunc={setConfirm_password} 
              type="password" 
              isSignUp={isSignUp} 
              />
            )}

            {!isSignUp ? (
              <p>
                Non Hai un Account? {""}
                <motion.button 
                {...buttonClick} 
                className='text-red-400 underline cursor-pointer bg-transparent'
                onClick={()=> setIsSignUp(true)}
                >
                  Registrati
                </motion.button> 
              </p> 
            ) : (
              <p>
                Hai Già un Account? {""}
                <motion.button 
                {...buttonClick} 
                className='text-red-400 underline cursor-pointer bg-transparent'
                onClick={()=> setIsSignUp(false)}
                > 
                  Accedi
                </motion.button> 
              </p> 
            )}

            {/* Button Section */}
            {isSignUp ? (
              <motion.button 
              {...buttonClick} 
              className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150'
              >
                Registrati
              </motion.button>
            ) : (
              <motion.button 
              {...buttonClick} 
              className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150'
              >
                Accedi
              </motion.button>
            )}
            
          </div>
          <div className='flex items-center justify-between gap-16'>
            <div className='w-24 h-[1px] rounded-md bg-white'></div>
            <p className='text-black'>Accedi Con Google</p>
            <div className='w-24 h-[1px] rounded-md bg-white'></div>
          </div>

          <motion.div 
          {...buttonClick} 
          className='flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4'
          onClick={loginWithGoogle}
          >
            <FcGoogle className='text-3xl' />
            <p className='capitalize text-base text-headingColor'>
              Accedi Con Google
            </p>
          </motion.div>
      </div>
  </div>
  );
};

export default Login
