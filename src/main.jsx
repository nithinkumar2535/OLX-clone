import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.js'
import {FirebaseContext} from './store/Context'
import {firebase,db,storage} from './firebase/config';
import Context from './store/Context';





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, db, storage }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
