import React, { useState, useCallback } from 'react'
import { Primarybutton, Textinput } from '../components/UIkit'
import { useSelector, useDispatch } from "react-redux"
import { reset } from '../reducks/users/operations';
import { push } from 'connected-react-router';

const Reset = () => {
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const users = state.users;

   const [email, setEmail] = useState("");

   const inputEmail = useCallback((e) => {
      setEmail(e.target.value)
   }, [email])

   return (
      <div className="c-section-container">
         <h2 className="u-text__headline u-text-center">Reset Password!</h2>
         <div className="module-spacer--medium" />
         <div>
            <pre>{JSON.stringify(users, null, 4)}</pre>
         </div>

         <Textinput
            fullWidth={true} label={"email address"} multiline={false} required={true}
            type={"email"} value={email} onChange={inputEmail} rows={1}
         />

         <div className="module-spacer--medium" />
         <div className="center">
            <Primarybutton label={"Reset Password"} onClick={() => dispatch(reset(email))} />
         </div>
         <div className="module-spacer--medium" />
         <p onClick={() => dispatch(push("/signin"))}>back to Login page</p>

      </div>
   )
};

export default Reset;