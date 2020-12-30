import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import NoImage from "../../assets/img/src/no_image.png";
import {
   Divider, ListItem, ListItemText, ListItemAvatar, IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete"
import { getUserId } from '../../reducks/users/selectors';
import { db } from '../../firebase';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
   list: {
      height: 128
   },
   image: {
      objectFit: "cover",
      margin: 16,
      height: 96,
      width: 96
   },
   text: {
      width: "100%"
   }
})

const CartListItem = ({ cart }) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const uid = getUserId(state);

   const images = (cart.images.length === 0 ? NoImage : cart.images[0].path)
   const newPrice = cart.price.toLocaleString();

   const deleteCart = async (cartId) => {
      await db.collection("users").doc(uid).collection("cart").doc(cartId).delete().then(() => {
         dispatch(push("/"))
      })
   };
   return (
      <>
         <ListItem className={classes.list}>
            <ListItemAvatar>
               <img src={images} className={classes.image} alt={cart.name} />
            </ListItemAvatar>
            <div className={classes.text}>
               <ListItemText primary={cart.name} secondary={`サイス:${cart.size}`} />
               <ListItemText primary={`¥${newPrice}`} />
            </div>
            <IconButton onClick={() => deleteCart(cart.cartId)}>
               <DeleteIcon />
            </IconButton>
         </ListItem>
         <Divider />
      </>
   )
};

export default CartListItem;