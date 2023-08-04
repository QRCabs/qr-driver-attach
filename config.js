import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCLRWaqF5nexZSgk4pj0XDpNb1PVmg7oQk",
  authDomain: "qrcabs-9a139.firebaseapp.com",
  projectId: "qrcabs-9a139",
  storageBucket: "qrcabs-9a139.appspot.com",
  messagingSenderId: "284223316506",
  appId: "1:284223316506:web:e6bffc469e14427a8867a3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
