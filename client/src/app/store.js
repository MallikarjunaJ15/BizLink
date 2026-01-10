import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/api/rootReducer";
import { authApi } from "@/api/authApi";
import { BusinessApi } from "@/api/BusinessApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (dm) => dm().concat(authApi.middleware, BusinessApi.middleware),
});

//
