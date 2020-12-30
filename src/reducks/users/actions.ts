export const SIGN_IN = "SIGN_IN";

interface signInActionProps {
   username: string,
   uid: string,
   role: string,
};

export const signInAction = ({ username, uid, role }: signInActionProps) => {
   return {
      type: "SIGN_IN",
      payload: {
         isSignIn: true as boolean,
         username: username,
         uid: uid,
         role: role,
      }
   }
};

export const SIGN_OUT = "SIGN_OUT";

export const signOutAction = () => {
   return {
      type: "SIGN_OUT",
      payload: {
         isSignIn: false,
         username: "",
         uid: "",
         role: "",
      }
   }
};

interface imageProps {
   path: string,
   id: number,
}

interface cartDetailProps {
   cartId: number,
   created_at: Date,
   name: string,
   gender: string,
   images: imageProps[],
   description: string,
   price: number,
   productId: number,
   quantity: number,
   size: string,
}

interface cartProps {
   cartData: cartDetailProps[]
}

export const ADD_CART = "ADD_CART";

export const addStoreCartDataAction = ({ cartData }: cartProps) => {
   return {
      type: "ADD_CART",
      payload: {
         cartData
      }
   }
};


interface cartProductsProps {
   id: number,
   images: imageProps[],
   name: string,
   price: number,
   size: string,

}

interface orderDetailProps {
   orderId: number,
   created_at: Date,
   updated_at: Date,
   products: cartProductsProps[],
   amount: number,
   shipping_date: Date,
}

interface orderProps {
   orderData: orderDetailProps[]
}


export const FETCH_ORDER = "FETCH_ORDER";

export const fetchOrderHistoryAction = ({ orderData }: orderProps) => {
   return {
      type: "FETCH_ORDER",
      payload: {
         orderData
      }
   }
};

