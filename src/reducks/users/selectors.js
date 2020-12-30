import { createSelector } from "reselect";

//return  state.user.uid
const usersSelector = (state) => state.users;
export const getUserId = createSelector(
   [usersSelector],
   state => state.uid
);

export const getUserName = createSelector(
   [usersSelector],
   state => state.username
);

export const getIsSignIn = createSelector(
   [usersSelector],
   state => state.isSignIn
);

export const getCart = createSelector(
   [usersSelector],
   state => state.cart
);

export const getOrder = createSelector(
   [usersSelector],
   state => state.order
);