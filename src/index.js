import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import App from './App';
import reducer from './reducers/index';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import firebase from './configs/fireBaseConfig';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects?????

firebase.initializeApp({
    apiKey: "AIzaSyDKPisSU7KUgmNWYuey8XJP4KRtfauTgVA",
    authDomain: "internetbanking-4c113.firebaseapp.com",
    databaseURL: "https://internetbanking-4c113.firebaseio.com",
    projectId: "internetbanking-4c113",
    storageBucket: "internetbanking-4c113.appspot.com",
    messagingSenderId: "761677647821",
    appId: "1:761677647821:web:eba005684812d63fcf3e84",
    measurementId: "G-5WB3XB3D00"
});

const middleware = [thunk, logger];
const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));




// const store = createStore(reducer, compose(
//     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }),logger),
//     reactReduxFirebase(fireBaseConfig, { userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true }),
//     reduxFirestore(fireBaseConfig) // redux bindings for firestore
// ));



// store.firebaseAuthIsReady.then(() => {
//     ReactDOM.render((
//         <Provider store={store}>
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>
//         </Provider>
//     ), document.getElementById('root'));
// });


