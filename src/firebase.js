// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  
    apiKey: "AIzaSyD5hUjjOT9IsjRS8jy8ngprNSgVlkwEDeQ",
    authDomain: "todoapp-24acc.firebaseapp.com",
    projectId: "todoapp-24acc",
    storageBucket: "todoapp-24acc.appspot.com",
    messagingSenderId: "188015853636",
    appId: "1:188015853636:web:99380194a1a44641307c11",
    measurementId: "G-7DKXFT1KVF"

});
const db = firebaseApp.firestore();

export default db;