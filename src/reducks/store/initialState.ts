import { initialProps } from "./initialProps";


const initialState: initialProps = {
   users: {
      isSignIn: false,
      username: "",
      uid: "",
      role: ""
   },
   products: {
      list: [],
   }
};

export default initialState;