import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import authReducer from './state'; //authReducer is used to get the reducer from the state.js file
import { configureStore } from '@reduxjs/toolkit'; //configureStore is used to create the redux store
import { Provider } from 'react-redux'; //Provider is used to provide the redux store to the app
import {
  persistStore, //persistStore is used to persist the redux store
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react'; //PersistGate is used to persist the redux store and render the app only after the redux store is persisted

//persistConfig is used to configure the redux-persist
const persistConfig ={key:"root", storage, version:1};
//persistedReducer is used to persist the authReducer
const persistedReducer =persistReducer(persistConfig,authReducer);
const store=configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware)=>
  getDefaultMiddleware({
    serializableCheck:{ //serializableCheck is used to ignore the actions that are not serializable
      ignoredActions : [FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
    },
  }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App>
      </App>
    </PersistGate>
   </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
