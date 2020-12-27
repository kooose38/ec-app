import {
   createStore as reduxCreateStore,
   combineReducers,
   applyMiddleware
} from "redux";
import { UserReducer } from "../users/reducers";
import { ProductReducer } from "../products/reducers";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";     //非同期制御

export default function createStore(history) {
   return reduxCreateStore(
      combineReducers({
         users: UserReducer,
         products: ProductReducer,
         router: connectRouter(history),
      }),
      applyMiddleware(
         routerMiddleware(history),
         thunk
      )
   )
};