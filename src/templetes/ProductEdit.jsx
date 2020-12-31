import React, { useState, useCallback, useEffect } from 'react';
import { Textinput, SelectBox, Primarybutton } from '../components/UIkit';
import { useDispatch } from "react-redux";
import { getFetchProducts, saveProducts, updatedProducts } from "../reducks/products/operations";
import { ImageArea, SetSizeArea } from '../components/products';
import { db } from '../firebase';


const ProductEdit = () => {
   const dispatch = useDispatch();
   const id = window.location.pathname.split("/edit")[1];
   let productId = "";
   if (id !== "") {
      productId = id.split("/")[1]
   }

   useEffect(async () => {
      if (id !== "") {
         dispatch(
            await getFetchProducts(productId, setName, setDescriptopn, setCategory, setGender, setImages, setPrice, setSizes)
         )
      }
   }, [productId]);



   const
      [name, setName] = useState(""),
      [descriptopn, setDescriptopn] = useState(""),
      [category, setCategory] = useState(""),
      [categories, setCategories] = useState([]),
      [gender, setGender] = useState(""),
      [genders, setGenders] = useState([]),
      [images, setImages] = useState([]),
      [sizes, setSizes] = useState([]),
      [price, setPrice] = useState("");


   const inputName = useCallback((e) => {
      setName(e.target.value)
   }, [setName]);
   const inputDescriptopn = useCallback((e) => {
      setDescriptopn(e.target.value)
   }, [setDescriptopn]);
   const inputPrice = useCallback((e) => {
      setPrice(e.target.value)
   }, [setPrice]);
   const inputCate = useCallback((e) => {
      setCategory(e.target.value)
   }, [setCategory]);
   const inputGender = useCallback((e) => {
      setGender(e.target.value)
   }, [setGender]);

   useEffect(() => {
      (async () => {
         const prev = [];
         await db.collection("categories").orderBy("order", "asc").get().then(snapshots => {
            snapshots.forEach(doc => {
               const data = doc.data();
               prev.push({
                  ...data  //query検索のためidとnameは同じ値にする
               });
            })
            setCategories(prev);
         }).catch(err => {
            alert(err.message);
         });
         async () => {
            const prevs = [];
            await db.collection("genders").orderBy("order", "asc").get().then(snapshots => {
               snapshots.forEach(doc => {
                  const data = doc.data();
                  prevs.push({
                     ...data
                  })
               })
               setGenders(prevs);
            })
         }
      })();
   }, [])

   return (
      <section>
         <h2 className="u-text__headline u-text-center">product edit</h2>
         <div className="c-section-container">
            <pre>{JSON.stringify({ name, descriptopn, category, gender, price, images, sizes }, null, 4)}</pre>
            <ImageArea images={images} setImages={setImages} />
            <Textinput
               fullWidth={true} rows={1} multiline={false} required={true}
               value={name} type={"text"} onChange={inputName} label={"商品名"}
            />
            <Textinput
               fullWidth={true} rows={1} multiline={false} required={true}
               value={descriptopn} type={"text"} onChange={inputDescriptopn} label={"商品説明"}
            />
            <SelectBox
               label={"カテゴリー"} value={category} options={categories} required={true} onChange={inputCate}
            />
            <SelectBox
               label={"性別"} value={gender} options={genders} required={true} onChange={inputGender}
            />
            <Textinput
               fullWidth={true} rows={1} multiline={false} required={true}
               value={price} type={"number"} onChange={inputPrice} label={"価格"}
            />
            <div className="module-spacer--small"></div>
            <SetSizeArea sizes={sizes} setSizes={setSizes} />
            <div className="module-spacer--small"></div>
            <div className="center">
               <Primarybutton
                  label={"商品情報を登録"}
                  onClick={productId === "" ? (
                     //new create products
                     async () => dispatch(await saveProducts(name, descriptopn, category, gender, price, images, sizes))) : (
                        //updated products
                        async () => dispatch(await updatedProducts(productId, name, descriptopn, category, gender, price, images, sizes))
                     )}
               />
            </div>
         </div>
      </section>
   );
}

export default ProductEdit;