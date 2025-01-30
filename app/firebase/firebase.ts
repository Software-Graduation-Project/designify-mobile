import firebase from "firebase/compat/app";
import "firebase/compat/database"; // For Realtime Database
// import "firebase/compat/firestore"; // Uncomment for Firestore

const firebaseConfig = {
    apiKey: "AIzaSyA4qccbnyYb_Tl6A2TPAqI7viwNj4EfHb4",
    authDomain: "appchat-3ea29.firebaseapp.com",
    databaseURL: "https://appchat-3ea29-default-rtdb.firebaseio.com",
    projectId: "appchat-3ea29",
    storageBucket: "appchat-3ea29.firebasestorage.app",
    messagingSenderId: "581244382904",
    appId: "1:581244382904:web:e311900d57dc7a0fd80e4d",
    measurementId: "G-CL77VQ1840"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database(); // For Realtime Database
// export const db = firebase.firestore(); // Uncomment for Firestore
