import * as Action from "./actions";
import initialState from "../store/initialState";


// return は {}
export const UserReducer = (state = initialState.users, action) => {
   switch (action.type) {
      case Action.SIGN_IN:
         return {
            ...state,
            ...action.payload
         }
      case Action.SIGN_OUT:
         return {
            ...state,
            ...action.payload
         }
      case Action.ADD_CART:
         return {
            ...state,
            cart: [...action.payload]
         }
      case Action.FETCH_ORDER:
         return {
            ...state,
            order: [...action.payload]
         }
      default:
         return {
            ...state
         }
   }
};
