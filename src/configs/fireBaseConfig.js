import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyDayY0rT7oju0wAJmawM4jfr97MCEBONQc",
  authDomain: "poi-swd.firebaseapp.com",
  projectId: "poi-swd",
  storageBucket: "poi-swd.appspot.com",
  messagingSenderId: "346708218094",
  appId: "1:346708218094:web:6d93917fba10350a0ee3ff",
  measurementId: "G-TELKB81FGY"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 