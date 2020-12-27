export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProductAction = (data) => {
   return {
      type: "FETCH_PRODUCTS",
      payload: data
   }
};


export const DELETE_PRODUCTS = "DELETE_PRODUCTS";

export const deleteProductsAction = (products) => {
   return {
      type: "DELETE_PRODUCTS",
      payload: products
   }
};

