import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from "@/app/AuthSlice";
import { BusinessApi } from "./BusinessApi";
import { meetingApi } from "./MeetingApi";
import { availabilityApi } from "./Availability";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [BusinessApi.reducerPath]: BusinessApi.reducer,
  [meetingApi.reducerPath]: meetingApi.reducer,
  [availabilityApi.reducerPath]: availabilityApi.reducer,
  auth: authReducer,
});
export default rootReducer;
