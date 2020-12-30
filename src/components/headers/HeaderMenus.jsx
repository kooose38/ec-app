import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Badge } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import { getCart } from '../../reducks/users/selectors';
import { push } from 'connected-react-router';

const HeaderMenus = (props) => {
   const dispatch = useDispatch()
   const state = useSelector(state => state)
   const cart = getCart(state)
   return (
      <>
         <IconButton onClick={() => dispatch(push("/cart"))}>
            <Badge badgeContent={cart.length} color="secondary">
               <ShoppingCartIcon />
            </Badge>
         </IconButton>
         <IconButton>
            <FavoriteBorderIcon />
         </IconButton>
         <IconButton onClick={(e) => props.onClick(e)}>
            <MenuIcon />
         </IconButton>
      </>
   )
};

export default HeaderMenus;