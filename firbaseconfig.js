  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword, } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  // FOR DATA SAVING 
  import { getFirestore,doc, setDoc, getDoc,getDocs,collection, addDoc,query,where,serverTimestamp,deleteDoc,updateDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDvq7GgDDiGXVlGUF14gQdVXCV5a_hjTfA",
    authDomain: "signup-login-project.firebaseapp.com",
    projectId: "signup-login-project",
    storageBucket: "signup-login-project.appspot.com",
    messagingSenderId: "959762765088",
    appId: "1:959762765088:web:e6a5d8d330f2c6c205f345"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getFirestore(app);


//   export 
export{
    auth,
    app,
    deleteDoc,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    db,
    doc, 
    setDoc,
    onAuthStateChanged,
    getDoc,
    getDocs,
    collection,
    signOut,
    addDoc,
    query,
    where,
    serverTimestamp,
    updateDoc,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,

    
    

}