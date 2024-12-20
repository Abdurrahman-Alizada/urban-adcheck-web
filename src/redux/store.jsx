import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../redux/reducers/user/userSlice";
import jobReducer from "../redux/reducers/jobs/jobSlice";
import { userApi } from "../redux/reducers/user/userThunk";
import { jobApi } from "./reducers/jobs/jobThunk";


export const store = configureStore({
  reducer: {
    user: userReducer,
    job:jobReducer,
    [userApi.reducerPath]: userApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      jobApi.middleware
    ]),
});
setupListeners(store.dispatch);