import React, { useState, useCallback } from 'react'
import { Primarybutton, Textinput } from '../components/UIkit'
import { useSelector, useDispatch } from "react-redux"
import { signin } from '../reducks/users/operations';
import { push } from 'connected-react-router';

const Signin = () => {
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const users = state.users;

   const
      [email, setEmail] = useState(""),
      [password, setPassword] = useState("");


   const inputEmail = useCallback((e) => {
      setEmail(e.target.value)
   }, [email])
   const inputPassword = useCallback((e) => {
      setPassword(e.target.value)
   }, [password])



   return (
      <div className="c-section-container">
         <h2 className="u-text__headline u-text-center">Sign in Account!</h2>
         <div className="module-spacer--medium" />
         <div>
            <pre>{JSON.stringify(users, null, 4)}</pre>
         </div>

         <Textinput
            fullWidth={true} label={"email address"} multiline={false} required={true}
            type={"email"} value={email} onChange={inputEmail} rows={1}
         />
         <Textinput
            fullWidth={true} label={"password"} multiline={false} required={true}
            type={"password"} value={password} onChange={inputPassword} rows={1}
         />

         <div className="module-spacer--medium" />
         <div className="center">
            <Primarybutton label={"Registration Account"} onClick={() => dispatch(signin(email, password))} />
         </div>
         <div className="module-spacer--medium" />
         <p onClick={() => dispatch(push("/signup"))}>create Account</p>
         <div className="module-spacer--medium" />
         <p onClick={() => dispatch(push("/reset"))}>reset password</p>

      </div>
   )
};

export default Signin;