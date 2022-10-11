import firebase from 'firebase/app';
import 'firebase/auth';

// Use actual config values from registered firbase app
var config = {
  apiKey: "AIzaSyB0nizGN1GV2segFd3ggEnfqXi3RvMoc5U",
  authDomain: "pulse-social-8a98f.firebaseapp.com",
  projectId: "pulse-social-8a98f",
  storageBucket: "pulse-social-8a98f.appspot.com",
  messagingSenderId: "342401128616",
  appId: "1:342401128616:web:2de0d3c149b683efef0a9d",
  measurementId: "G-TW28FBNE55"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
