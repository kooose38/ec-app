import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles"
import { List, Divider } from "@material-ui/core";
import { getCart } from '../reducks/users/selectors';
import { CartListItem } from '../components/products';
import { Primarybutton, TextDetail } from '../components/UIkit';
import { orderProducts } from '../reducks/products/operations';

const useStyles = makeStyles((theme) => ({
   detailBox: {
      margin: "0 auto",
      [theme.breakpoints.down("sm")]: {
         width: 320
      },
      [theme.breakpoints.up("sm")]: {
         width: 512
      }
   },
   orderBox: {
      border: "1px solid rgba(0,0,0,0.2)",
      borderRadius: 4,
      boxShadow: "0 4px 2px 3px rgba(0,0,0,0.2)",
      width: 256,
      margin: "24px auto 16px",
      padding: 16,
      width: 288
   }
}))

const OrderConfirm = () => {
   const classes = useStyles();
   const dispatch = useDispatch()
   const state = useSelector(state => state)
   const carts = getCart(state);

   const subTotal = useMemo(() => {
      return carts.reduce((sum, cart) => sum += cart.price, 0);
   }, [carts]);

   const shippingFee = (subTotal >= 10000 ? 0 : 210)
   const tax = subTotal * 0.1;
   const totalPrice = subTotal + shippingFee + tax;

   const order = useCallback(async () => {
      dispatch(await orderProducts(carts, totalPrice));
   }, [carts, totalPrice]);

   return (
      <section className="c-section-wrapin">
         <h2 className="u-text__headline">注文の確認</h2>
         <div className="p-grid__row">
            <div className={classes.detailBox}>
               <List>
                  {
                     carts.length > 0 && (
                        carts.map(cart =>
                           <CartListItem key={cart.cartId} cart={cart} />
                        )
                     )
                  }
               </List>
               <div className={classes.orderBox}>
                  <TextDetail lable={"商品金額"} value={"¥" + subTotal.toLocaleString()} />
                  <TextDetail lable={"消費税"} value={"¥" + tax.toLocaleString()} />
                  <TextDetail lable={"送料"} value={"¥" + shippingFee.toLocaleString()} />
                  <Divider />
                  <TextDetail lable={"合計（税込）"} value={"¥" + totalPrice.toLocaleString()} />

                  <Primarybutton label={"注文する"} onClick={order} />
               </div>
            </div>
         </div>
      </section>
   );
}

export default OrderConfirm;