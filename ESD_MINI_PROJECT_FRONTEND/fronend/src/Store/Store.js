// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './AuthReducer';
import { thunk } from 'redux-thunk';
import hostelReducer from "./hostelReducer"
const rootReducer = combineReducers({

  auth: authReducer,
  hostel:hostelReducer,
 

});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
