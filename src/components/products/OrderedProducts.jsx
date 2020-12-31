import React, { useCallback } from 'react';
import { ListItem, ListItemAvatar, Divider, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch } from "react-redux";
import { Primarybutton } from '../UIkit';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
   list: {
      backgroundColor: "#fff",
      height: "auto",

   },
   image: {
      objectFit: "cover",
      margin: "8px 16px 8px 0",
      height: 96,
      width: 96
   },
   text: {
      width: "100%"
   }
})

const OrderedProducts = ({ product }) => {
   const classes = useStyles();
   const dispatch = useDispatch();

   const gotoProductDetail = useCallback((id) => {
      dispatch(push(`/detail/${id}`))
   }, []);

   const returnImage = (images) => {
      if (Array.isArray(images)) {
         return images[0].path;
      }
   };

   return (
      <>
         <ListItem className={classes.list}>
            <ListItemAvatar>
               <img className={classes.image} src={returnImage(product.images)} alt={product.name} />
            </ListItemAvatar>
            <div className={classes.text}>
               <ListItemText
                  primary={product.name}
                  secondary={`サイズ: ${product.size}`}
               />
               <ListItemText
                  primary={`¥ ${product.price.toLocaleString()}`}
               />
            </div>
            <Primarybutton label={"詳細を見る"} onClick={() => gotoProductDetail(product.id)} />
         </ListItem>
         <Divider />
      </>
   );
}

export default OrderedProducts;