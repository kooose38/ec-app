import React, { useCallback } from 'react';
import { makeStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux"
import { List } from "@material-ui/core";
import { getCart } from '../reducks/users/selectors';
import { CartListItem } from '../components/products';
import { Primarybutton, GrayButton } from '../components/UIkit';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
   container: {
      [theme.breakpoints.up("sm")]: {
         maxWidth: "800px",
         width: "100%",
         margin: "0 auto"
      },
      [theme.breakpoints.down("sm")]: {
         maxWidth: "400px",
         width: "100%",
         margin: "0 auto "
      }

   },
   root: {
      margin: "0 auto",
      maxWidth: 512,
      width: "100%"
   }
}))

const CartList = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const carts = getCart(state);

   const getoOrder = useCallback(() => {
      dispatch(push("/order/confirm"))
   }, []);
   const goToHome = useCallback(() => {
      dispatch(push("/"))
   }, [])
   return (
      <section className="c-section-wrapin">
         <div className={classes.container}>
            <h2 className="u-text__headline">
               ショッピングカート
         </h2>
            <List className={classes.root}>
               {
                  carts.length > 0 && (
                     carts.map(cart =>
                        <CartListItem key={cart.cartId} cart={cart} />
                     )
                  )
               }
            </List>
            <div className="module-spacer--medium"></div>
            <div className="p-grid__row">
               <Primarybutton label={"レジへ進む"} onClick={getoOrder} />
               <div className="module-spacer--extra-extra-small"></div>
               <GrayButton label={"ショッピングを続ける"} onClick={goToHome} />
            </div>

         </div>
      </section >
   )
};

export default CartList;