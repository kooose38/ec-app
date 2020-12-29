import { useState, useEffect, useCallback } from 'react';
import { ImageSwiper, SizeTable } from "../components/products/index";
import { makeStyles } from "@material-ui/styles";
import { HTMLReactParser } from "html-react-parser";
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
   slideBox: {
      [theme.breakpoints.down("sm")]: {
         margin: "0 auto 24px",
         height: 320,
         width: 320
      },
      [theme.breakpoints.up("sm")]: {
         margin: "0 auto",
         height: 400,
         width: 400
      }

   },
   detail: {
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
         margin: "0 auto 16px",
         height: "auto",
         width: 320
      },
      [theme.breakpoints.up("sm")]: {
         margin: "0 auto",
         height: "auto",
         width: 400,
      }

   },
   price: {
      fontSize: 36
   }
}));

const ProductDetail = () => {
   const classes = useStyles()
   const id = window.location.pathname.split("/detail/")[1]
   const [product, setProduct] = useState(null);

   useEffect(async () => {
      await db.collection("products").doc(id).get().then((snapshot) => {
         const data = snapshot.data();
         setProduct(data);
      })
   }, []);

   return (
      <section className="c-section-wrapin">
         {product && (
            <div className="p-grid__row">
               <div className={classes.slideBox}>
                  <ImageSwiper images={product.images} />
               </div>
               <div className={classes.detail}>
                  <h2 className="u-text__headline">{product.name}</h2>
                  <p className={classes.price}>{product.price.toLocaleString()}</p>
                  <div className="module-spacer--small"></div>
                  <SizeTable sizes={product.sizes} />
                  <div className="module-spacer--small"></div>
                  <h3>{product.description}</h3>
               </div>
            </div>

         )}
      </section>
   )

}

export default ProductDetail;