import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9vFN8unWGkH5_8XppdmXMt2MiGktGmVI",
  authDomain: "discord-clone-5094d.firebaseapp.com",
  projectId: "discord-clone-5094d",
  storageBucket: "discord-clone-5094d.appspot.com",
  messagingSenderId: "991019510791",
  appId: "1:991019510791:web:3eaafb0aa9a2551f410ea2",
  measurementId: "G-XXWC8WWKYG",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
