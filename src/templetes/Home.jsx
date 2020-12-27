import { push } from 'connected-react-router'
import React, { Component } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { signout } from '../reducks/users/operations'
import { getIsSignIn } from '../reducks/users/selectors'


const Home = () => {
   const dispatch = useDispatch()
   const state = useSelector(state => state)
   const isSignIn = getIsSignIn(state)


   const users = state.users

   return (
      <>
         <pre>Home {JSON.stringify(users, null, 4)}</pre>
         <button onClick={() => dispatch(signout())}>signOut</button>
         <button onClick={() => dispatch(push("/edit"))}>add</button>
      </>
   );
}

export default Home;