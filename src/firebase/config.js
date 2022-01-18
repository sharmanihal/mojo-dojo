import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyADCkfbNK6hNf2zBGBl4X0V76CzuS0pItU",
    authDomain: "thedojosite-b295e.firebaseapp.com",
    projectId: "thedojosite-b295e",
    storageBucket: "thedojosite-b295e.appspot.com",
    messagingSenderId: "878675870587",
    appId: "1:878675870587:web:a6b18d5dc7e454eac433de"
  };
  

  firebase.initializeApp(firebaseConfig);

  //init services
  const projectFirestore=firebase.firestore();
  const projectAuth=firebase.auth();
  const projectStorage=firebase.storage();
  //firebase timestamp
  const timestamp=firebase.firestore.Timestamp
  export {projectFirestore,projectAuth,timestamp,projectStorage}