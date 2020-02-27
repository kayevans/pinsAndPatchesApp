// firebase info
import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBGBC1coBaK7vzG6TkK_9373dCpKjQND0c",
    authDomain: "pins-and-patches-app.firebaseapp.com",
    databaseURL: "https://pins-and-patches-app.firebaseio.com",
    projectId: "pins-and-patches-app",
    storageBucket: "pins-and-patches-app.appspot.com",
    messagingSenderId: "299635806312",
    appId: "1:299635806312:web:5823e080a41929c53b6bdd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
