import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase"
import { fetchProductAction, deleteProductsAction } from "./actions";
//new create 
export const saveProducts = async (name, descriptopn, category, gender, price, images, sizes) => {
   return async (dispatch) => {
      if (name === "" || descriptopn === "" || category === "" || gender === "" || price === "") {
         alert("未入力項目があります。")
         return;
      }
      const timestamp = FirebaseTimestamp.now();
      const newPrice = parseInt(price, 10)

      const products = {
         name: name,
         description: descriptopn,
         category: category,
         price: newPrice,
         gender: gender,
         updated_at: timestamp,
         images: images,
         sizes: sizes
      }


      //ID新規作成
      const ref = await db.collection("products").doc();
      const id = ref.id;
      products.id = id;
      products.created_at = timestamp;


      await db.collection("products").doc(id).set(products).then(() => {
         dispatch(push("/"))
      }).catch((e) => {
         throw new Error(e.message)
      })
   }
};
//get product information
export const getFetchProducts = async (
   productId, setName, setDescriptopn, setCategory, setGender, setImages, setPrice, setSizes
) => {
   return async (dispatch) => {
      await db.collection("products").doc(productId).get().then(snapshot => {
         if (!snapshot) {
            return;
         }
         const data = snapshot.data()

         setName(data.name)
         setDescriptopn(data.description)
         setCategory(data.category)
         setGender(data.gender)
         setImages(data.images)
         setPrice(data.price)
         setSizes(data.sizes)
      }).catch((e) => {
         alert(e.message)
         dispatch(push("/edit"));
      })
   }
};
//updated 
export const updatedProducts = async (id, name, descriptopn, category, gender, price, images, sizes) => {
   return async (dispatch) => {
      if (name === "" || descriptopn === "" || category === "" || gender === "" || price === "") {
         alert("未入力項目があります。")
         return;
      }
      const timestamp = FirebaseTimestamp.now();
      const newPrice = parseInt(price, 10)

      const products = {
         name: name,
         description: descriptopn,
         category: category,
         price: newPrice,
         gender: gender,
         updated_at: timestamp,
         images: images,
         sizes: sizes
      }


      await db.collection("products").doc(id).update(products, { marge: true }).then(() => {
         dispatch(push("/"))
      }).catch((e) => {
         throw new Error(e.message)
      })
   }
};

export const homeGetProductFetch = async () => {
   return async (dispatch) => {
      const prev = [];
      await db.collection("products").orderBy("updated_at", "desc").get().then(snapshots => {
         snapshots.forEach(snapshot => {
            const data = snapshot.data();
            prev.push(data);
         })
         dispatch(fetchProductAction(prev));
      })
   }
}

export const deleteProduct = async (id) => {
   return async (dispatch, getState) => {
      await db.collection("products").doc(id).delete().then(() => {
         const prevProducts = getState().products.list;
         const index = prevProducts.findIndex(product => product.id === id);
         prevProducts.splice(index, 1);

         const nextProducts = getState().products.list;
         dispatch(deleteProductsAction(nextProducts));
      })
   }
}
//注文する
export const orderProducts = async (carts, amount) => {
   return async (dispatch, getState) => {
      if (carts.length === 0) {
         return;
      }
      const uid = getState().users.uid;
      const timestamp = FirebaseTimestamp.now();

      let products = [];   // [{購入した商品情報},{}]
      let soldOutProducts = [];     // ["売り切れ商品の名前",""]

      const batch = db.batch();
      //カートの同じ商品に対して、個数を１減らす
      carts.forEach(async (cart) => {
         const snapshot = await db.collection("products").doc(cart.productId).get();
         const sizes = snapshot.data().sizes;
         //配列で返す
         const updatedSizes = sizes.map(async (size) => {
            if (size.size === cart.size) {
               if (size.quantity === 0) {
                  soldOutProducts.push(cart.name)
                  return size;
               }
               return {
                  size: size.size,
                  quantity: size.quantity - 1
               }
            } else {
               return size;
            }

         })
         products.push({
            id: cart.productId,
            images: cart.images,
            name: cart.name,
            price: cart.price,
            size: cart.size,
         })
         //quantity -1 
         batch.update(
            await db.collection("products").doc(cart.productId),
            { sizes: updatedSizes }
         );
         //delete cart 
         batch.delete(
            await db.collection("users").doc(uid).collection("cart").doc(cart.cartId)
         )
      })

      if (soldOutProducts.length > 1) {
         const errorMessage = soldOutProducts.join("と");
         alert(`大変申し訳ありません。${errorMessage}が在庫切れとなったため中断しました。`)
         return;
      } else if (soldOutProducts.length === 1) {
         const errorMessage = soldOutProducts[0];
         alert(`大変申し訳ありません。${errorMessage}が在庫切れとなったため中断しました。`)
         return;
      } else {
         batch.commit().then(async () => {
            //order documnt 作成
            const orderRef = await db.collection("users").doc(uid).collection("order").doc();
            const orderId = orderRef.id;
            const date = timestamp.toDate();
            const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)));

            const history = {
               orderId: orderId,
               created_at: timestamp,
               updated_at: timestamp,
               products: products,  //[]
               amount: amount,
               shippin_date: shippingDate,
            };

            await db.collection("users").doc(uid).collection("order").doc(orderId).set(history).then(() => {
               dispatch(push("/order/complete"));
            })
         }).catch(() => {
            alert("通信環境をご確認の上、再度お試しください。")
         })
      }

   }
}