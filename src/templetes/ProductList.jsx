import React, { useEffect } from 'react';
import { ProductCard } from "../components/products";
import { useDispatch, useSelector } from "react-redux";
import { homeGetProductFetch } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";


const ProductList = () => {
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const products = getProducts(state)    //[]

   useEffect(async () => {
      dispatch(await homeGetProductFetch())
   }, [products]);

   return (
      <section className="c-section-wrapin">
         <div className="p-grid__row">
            {
               products.map(product =>
                  <ProductCard key={product.id} product={product} />
               )
            }
         </div>
      </section>
   )
};

export default ProductList