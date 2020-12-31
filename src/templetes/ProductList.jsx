import React, { useEffect } from 'react';
import { addStoreCartData } from "../reducks/users/operations";
import { ProductCard } from "../components/products";
import { useDispatch, useSelector } from "react-redux";
import testImg from "../assets/img/mainImg/images.jpg";
import { homeGetProductFetch } from "../reducks/products/operations";
import { getProducts } from "../reducks/products/selectors";
import { db } from '../firebase';
import { getCart, getUserId } from '../reducks/users/selectors';


const ProductList = () => {
   const dispatch = useDispatch();
   const state = useSelector(state => state)
   const products = getProducts(state)    //[]
   const uid = getUserId(state)

   const query = window.location.pathname;
   //data().id を取得
   const gender = ((/^\/\?gender=/).test(query) ? query.split("/?gender=")[1] : "");
   const category = ((/^\/\?category=/).test(query) ? query.split("/?category=")[1] : "");
   // queryに合わせてstate値は常時変わる
   useEffect(async () => {
      dispatch(await homeGetProductFetch(gender, category))
   }, [query]);

   //store.cart の更新 componentWillmount
   useEffect(() => {
      //空の配列
      const stateCart = getCart(state);
      const unsubscribe = async () => await db.collection("users").doc(uid).collection("cart").onSnapshot(snapShots => {
         snapShots.docChanges().forEach(change => {
            const cartData = change.doc.data();
            const changeType = change.type;

            switch (changeType) {
               case "added":  //追加
                  stateCart.push(cartData);
                  break;
               case "modified":  //更新
                  const updateIndex = stateCart.findIndex(cart => cart.cartId === cartData.cartId);
                  stateCart[updateIndex] = cartData;
                  break;
               case "removed":  //削除
                  const removeIndex = stateCart.findIndex(cart => cart.cartId === cartData.cartId);
                  stateCart.splice(removeIndex, 1)
                  break;
            }
         })

         dispatch(addStoreCartData(stateCart))
      })

      return () => unsubscribe()
   }, [])

   return (
      <section className="c-section-wrapin">
         <div className="p-grid__row">
            {
               products.length === 0 ? (
                  <h2>商品がありません</h2>
               ) : (
                     products.map(product =>
                        <ProductCard key={product.id} product={product} />
                     )
                  )
            }
         </div>
      </section>
   )
};

export default ProductList