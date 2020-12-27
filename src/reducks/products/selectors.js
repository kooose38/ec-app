import { createSelector } from "reselect";

//return  state.user.uid
const usersSelector = (state) => state.products;
export const getProducts = createSelector(
   [usersSelector],
   state => state.list
);
