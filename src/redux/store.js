import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import patienceReducer from "./accounts/patienceReducer";



const rootReducer = combineReducers({
    user: authReducer,
    patience:patienceReducer
  });
  
  const store = configureStore({
    reducer: rootReducer,
  });


  export default store;