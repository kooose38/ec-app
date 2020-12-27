import React, { useState, useCallback } from 'react'
import { Primarybutton, Textinput } from '../components/UIkit'
import { useSelector, useDispatch } from "react-redux"
import { signup } from '../reducks/users/operations';
import { push } from 'connected-react-router';

const Signup = () => {
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const users = state.users;

   const [name, setName] = useState(""),
      [email, setEmail] = useState(""),
      [password, setPassword] = useState(""),
      [confirm, setConfirm] = useState("");

   const inputName = useCallback((e) => {
      setName(e.target.value)
   }, [name])
   const inputEmail = useCallback((e) => {
      setEmail(e.target.value)
   }, [email])
   const inputPassword = useCallback((e) => {
      setPassword(e.target.value)
   }, [password])
   const inputConfirm = useCallback((e) => {
      setConfirm(e.target.value)
   }, [confirm])


   return (
      <div className="c-section-container">
         <h2 className="u-text__headline u-text-center">Create new Account!</h2>
         <div className="module-spacer--medium" />
         <div>
            <pre>{JSON.stringify(users, null, 4)}</pre>
         </div>
         <Textinput
            fullWidth={true} label={"username"} multiline={false} required={true}
            type={"text"} value={name} onChange={inputName} rows={1}
         />
         <Textinput
            fullWidth={true} label={"email address"} multiline={false} required={true}
            type={"email"} value={email} onChange={inputEmail} rows={1}
         />
         <Textinput
            fullWidth={true} label={"password"} multiline={false} required={true}
            type={"password"} value={password} onChange={inputPassword} rows={1}
         />
         <Textinput
            fullWidth={true} label={"confirm password"} multiline={false} required={true}
            type={"password"} value={confirm} onChange={inputConfirm} rows={1}
         />
         <div className="module-spacer--medium" />
         <div className="center">
            <Primarybutton label={"Registration Account"} onClick={() => dispatch(signup(name, email, password, confirm))} />
         </div>
         <div className="module-spacer--medium" />
         <p onClick={() => dispatch(push("/signin"))}>back to Login page</p>

      </div>
   )
};

export default Signup;