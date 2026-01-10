import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from "@/app/AuthSlice";
import { BusinessApi } from "./BusinessApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [BusinessApi.reducerPath]: BusinessApi.reducer,
  auth: authReducer,
});
export default rootReducer;
