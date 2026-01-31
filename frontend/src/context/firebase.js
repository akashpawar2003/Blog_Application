import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAi9WaRnsTaTDSCmRcDeff7MGjgglpfH88",
  authDomain: "blog-application-2944b.firebaseapp.com",
  projectId: "blog-application-2944b",
  storageBucket: "blog-application-2944b.firebasestorage.app",
  messagingSenderId: "516480747138",
  appId: "1:516480747138:web:a2e24dfdfc8f174df1169b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth , provider}
