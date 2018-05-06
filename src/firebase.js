import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAYgDkoIrccpH5J-at1LPuB0uevK0S5Y6o",
    authDomain: "simple-note-56020.firebaseapp.com",
    databaseURL: "https://simple-note-56020.firebaseio.com",
    projectId: "simple-note-56020",
    storageBucket: "simple-note-56020.appspot.com",
    messagingSenderId: "641277414896"
  };
  firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();