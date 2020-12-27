import { push } from 'connected-react-router';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getIsSignIn } from '../reducks/users/selectors';

const Auth = ({ children }) => {
   const state = useSelector(state => state)
   const isSignin = getIsSignIn(state)
   const dispatch = useDispatch();

   useEffect(() => {
      if (!isSignin) {
         dispatch(push("/signin"))
      }
   }, []);


   if (isSignin) {
      return (
         <>
            {children}
         </>
      )
   } else {
      return (
         <></>
      )
   }
};

export default Auth;