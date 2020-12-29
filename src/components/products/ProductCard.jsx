import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from "../../assets/img/src/no_image.png"
import { useDispatch } from "react-redux";
import { push } from 'connected-react-router';
import NOVertIcon from "@material-ui/icons/MoreVert";
import {
   Menu, MenuItem, IconButton
} from "@material-ui/core";
import { deleteProduct } from "../../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
   root: {
      [theme.breakpoints.down("sm")]: {
         margin: 8,
         width: "calc(50% - 16px)",
      },
      [theme.breakpoints.up("sm")]: {
         margin: 16,
         width: "calc(33.3333% - 32px)"
      }
   },
   content: {
      display: "flex",
      padding: "16px 8px",
      textAlign: "left",
      "$:last-child": {
         paddingBottom: 16
      }
   },
   media: {
      height: 0,
      paddingTop: "100%",
   },
   price: {
      color: "red",
      fontWeight: "bold",
      fontSize: 16,
   }
}));

const ProductCard = ({ product }) => {
   const dispatch = useDispatch();
   const classes = useStyles();
   const image = (product.images.length === 0 ? NoImage : product.images[0].path);

   const [anchorEl, setAnchorEl] = useState();

   const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
   };
   const hendleClose = () => {
      setAnchorEl(null);
   };

   return (
      <Card className={classes.root}>
         <CardMedia
            className={classes.media}
            image={image}
            title={product.name}
            onClick={() => dispatch(push(`/detail/${product.id}`))}
         />
         <CardContent className={classes.content}>
            <div onClick={() => dispatch(push(`/detail/${product.id}`))}>
               <Typography color="textSecondary" component="p">
                  {product.name}
               </Typography>
               <Typography className={classes.price} variant="body2" color="textSecondary" component="p">
                  ¥{product.price.toLocaleString()}
               </Typography>
            </div>
            <IconButton>
               <NOVertIcon onClick={handleClick} />
            </IconButton>
            <Menu
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               onClose={hendleClose}
            >
               <MenuItem
                  onClick={() => {
                     dispatch(push(`/edit/${product.id}`))
                     hendleClose()
                  }}
               >
                  編集する
               </MenuItem>
               <MenuItem
                  onClick={async () => {
                     dispatch(await deleteProduct(product.id))
                     hendleClose()
                  }}
               >
                  削除する
               </MenuItem>

            </Menu>
         </CardContent>
      </Card>
   )
};

export default ProductCard;