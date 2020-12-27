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
