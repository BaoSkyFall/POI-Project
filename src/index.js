import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import App from './App';
import reducer from './reducers/index';
// import firebase from './configs/fireBaseConfig';

// const firebase = require("firebase");
// require("firebase/firestore"); // Required for side-effects?????

// firebase.initializeApp({
//     apiKey: "AIzaSyDayY0rT7oju0wAJmawM4jfr97MCEBONQc",
//     authDomain: "poi-swd.firebaseapp.com",
//     projectId: "poi-swd",
//     storageBucket: "poi-swd.appspot.com",
//     messagingSenderId: "346708218094",
//     appId: "1:346708218094:web:6d93917fba10350a0ee3ff",
//     measurementId: "G-TELKB81FGY"
// });
// firebase.firestore();

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


