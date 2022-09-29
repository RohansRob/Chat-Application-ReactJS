import firebase from "firebase/app";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyB0FQveMe9kJq6FasNN5rE4maz_-GX4GU0",
    authDomain: "unichat-5f6c8.firebaseapp.com",
    projectId: "unichat-5f6c8",
    storageBucket: "unichat-5f6c8.appspot.com",
    messagingSenderId: "482677118939",
    appId: "1:482677118939:web:97558bec376f3d2eb479fe",
    measurementId: "G-SDPWMBPNDP"
  }).auth();
  

