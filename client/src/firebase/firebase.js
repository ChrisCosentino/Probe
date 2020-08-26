import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyBm0S47UXkXMt0nevIu8xTSN9XHsLEx_4I',
  authDomain: 'probe-7ae97.firebaseapp.com',
  databaseURL: 'https://probe-7ae97.firebaseio.com',
  projectId: 'probe-7ae97',
  storageBucket: 'probe-7ae97.appspot.com',
  messagingSenderId: '955439512956',
  appId: '1:955439512956:web:65d146ad08dc218624f8f9',
  measurementId: 'G-MG7ZC3VETX',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

//analytics is optional for this tutoral
firebase.analytics();

export { storage, firebase as default };
