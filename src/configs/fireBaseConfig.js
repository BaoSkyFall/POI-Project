import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyDKPisSU7KUgmNWYuey8XJP4KRtfauTgVA",
  authDomain: "internetbanking-4c113.firebaseapp.com",
  databaseURL: "https://internetbanking-4c113.firebaseio.com",
  projectId: "internetbanking-4c113",
  storageBucket: "internetbanking-4c113.appspot.com",
  messagingSenderId: "761677647821",
  appId: "1:761677647821:web:eba005684812d63fcf3e84",
  measurementId: "G-5WB3XB3D00"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 