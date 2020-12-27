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