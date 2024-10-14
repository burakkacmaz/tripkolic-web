import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzd-z_FWY8aF9QuYTI63-lOk05BQ16mfA",
  authDomain: "tripkolic-fa7f1.firebaseapp.com",
  projectId: "tripkolic-fa7f1",
  storageBucket: "tripkolic-fa7f1.appspot.com",
  messagingSenderId: "875542314608",
  appId: "1:875542314608:web:22152acc03690d69dcbeb5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
