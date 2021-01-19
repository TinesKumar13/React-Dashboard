import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCUvCNF-8nf7nbCxGqXvScCH1-WgAJUsgs",
  authDomain: "sidp-proj.firebaseapp.com",
  databaseURL: "https://sidp-proj-default-rtdb.firebaseio.com",
  projectId: "sidp-proj",
  storageBucket: "sidp-proj.appspot.com",
  messagingSenderId: "172377531851",
  appId: "1:172377531851:web:c8a417065d1f3f2409824e",
  measurementId: "G-4XZZTM2FEL",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
