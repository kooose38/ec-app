import React from 'react'
import { Switch, Route } from "react-router";
import {
   ProductList, Signup, Signin, Auth, Reset, ProductEdit, productDetail, ProductDetail
} from "./templetes/index"

const Router = () => {
   return (
      <Switch>

         <Route exact path={"/signin"} component={Signin} />
         <Route exact path={"/signup"} component={Signup} />
         <Route exact path={"/reset"} component={Reset} />

         {/* <Auth> */}
         <Route exact path={"(/)?"} component={ProductList} />
         <Route exact path={"/detail/:id"} component={ProductDetail} />
         <Route path={"/edit(/:id)?"} component={ProductEdit} />

         {/* </Auth> */}
      </Switch>
   );
}

export default Router;