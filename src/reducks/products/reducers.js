import * as Action from "./actions";
import initialState from "../store/initialState";


// return は {}
export const ProductReducer = (state = initialState.products, action) => {
   switch (action.type) {
      case Action.FETCH_PRODUCTS:
         return {
            ...state,   //list:[]
            list: [...action.payload]
         }
      case Action.DELETE_PRODUCTS:
         return {
            ...state,
            list: [...action.payload]
         }
      default:
         return {
            ...state
         }

   }
};
