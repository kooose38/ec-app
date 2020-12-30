import React, { useEffect } from 'react';
import { ProductCard } from "../components/products";
import { useDispatch, useSelector } from "react-redux";
import testImg from "../assets/img/mainImg/images.jpg";
import { homeGetProductFetch } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";


const ProductList = () => {
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const products = getProducts(state)    //[]

   useEffect(async () => {
      dispatch(await homeGetProductFetch())
   }, [products]);

   const testing = [
      { images: [{ path: testImg, name: "画像" }], name: "スポサン", id: "123546", price: 3200 },
      { images: [{ path: testImg, name: "画像" }], name: "スポサン", id: "123546", price: 3200 },
      { images: [{ path: testImg, name: "画像" }], name: "スポサン", id: "123546", price: 3200 },
   ];
   return (
      <section className="c-section-wrapin">
         <div className="p-grid__row">
            {/* {
               products.length === 0 ? (
                  <h2>商品がありません</h2>
               ) : (
                     products.map(product =>
                        <ProductCard key={product.id} product={product} />
                     )
                  )
            }
            testing */}
            {
               testing.length > 0 && (
                  testing.map(product =>
                     <ProductCard key={product.id} product={product} />

                  )
               )
            }

         </div>
      </section>
   )
};

export default ProductList