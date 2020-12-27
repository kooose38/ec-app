import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, FirebaseTimestamp, db } from "../../firebase/index";

export const signin = (email, password) => {
   return async (dispatch) => {
      if (email === "" || password === "") {
         alert("Required items are not entered")
         return;
      }
      return await auth.signInWithEmailAndPassword(email, password).then(async (result) => {
         const user = result.user;

         if (user) {
            const uid = user.uid;

            await db.collection("users").doc(uid).get().then(snapshot => {
               const data = snapshot.data();

               const uid = data.uid;
               const username = data.username;
               const role = data.role;

               dispatch(signInAction({
                  uid: uid,
                  role: role,
                  username: username,
               }));
               dispatch(push("/"));

            });
         } else {
            alert("no users ! Please Signup")
            return;
         }
      })
   };
};

export const signup = (name, email, password, confirm) => {
   return async (dispatch) => {
      if (name === "" || email === "" || password === "" || confirm === "") {
         alert("Required items are not entered ");
         return;
      }
      if (password !== confirm) {
         alert("Does not match");
         return;
      }
      return await auth.createUserWithEmailAndPassword(email, password).then(async (result) => {
         const user = result.user;

         if (user) {
            const uid = user.uid;
            const timestamp = FirebaseTimestamp.now();

            const userInitialData = {
               created_at: timestamp,
               email: email,
               role: "customer",
               uid: uid,
               updated_at: timestamp,
               username: name
            };

            await db.collection("users").doc(uid).set(userInitialData).then(() => {
               dispatch(signInAction({
                  uid: uid,
                  username: name,
                  role: userInitialData.role,
               }));
               dispatch(push("/"))
            });

         } else {
            alert("sorry exists ... please login now ")
         }
      })
   }
}

export const signout = () => {
   return async (dispatch) => {
      await auth.signOut().then(() => {
         dispatch(signOutAction());
         dispatch(push("/signin"));
      });
   }
};

export const reset = (email) => {
   return async (dispatch) => {
      if (email === "") {
         alert("email please!")
         return;
      }
      await auth.sendPasswordResetEmail(email).then(() => {
         alert("submit for email address!")
         dispatch(push("/signin"))
      }).catch(() => {
         alert("fail submit ")
      })
   }
}

