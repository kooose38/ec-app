import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles"
import { getOrder, getUserId } from '../reducks/users/selectors';
import { db } from '../firebase';
import { fetchOrderHistory } from '../reducks/users/operations';
import { OrderHistoryItem } from '../components/products';

const useStyles = makeStyles((theme) => ({
   orderList: {
      backgroundColor: theme.palette.grey["100"],
      margin: "0 auto",
      padding: 32,
      [theme.breakpoints.down("md")]: {
         width: "100%"
      },
      [theme.breakpoints.up("md")]: {
         width: 768
      },


   }
}))

const OrderHistory = () => {
   const classes = useStyles();
   const state = useSelector(state => state)
   const uid = getUserId(state);
   const order = getOrder(state);
   const dispatch = useDispatch();
   //ordersの取得
   useEffect(async () => {
      await db.collection("users").doc(uid).collection("order").orderBy("updated_at", "desc").get().then(snapshots => {
         snapshots.forEach(doc => {
            const data = doc.data();
            order.push(data);
         })
         dispatch(fetchOrderHistory(order))
      }).catch((err) => {
         alert(err.message);
      })
   }, [order]);

   return (
      <section className="c-section-wrapin">
         <List className={classes.orderList}>
            {
               order.length > 0 && (
                  order.map(order =>
                     <OrderHistoryItem key={order.orderId} order={order} />
                  )
               )
            }
         </List>
      </section >
   );
};

export default OrderHistory;