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
      default:
         return {
            ...state
         }
   }
};
