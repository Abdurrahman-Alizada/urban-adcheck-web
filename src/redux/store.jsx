import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../redux/reducers/user/userSlice";
import jobReducer from "../redux/reducers/jobs/jobSlice";
import packageReducer from "../redux/reducers/package/packageSlice";
import { userApi } from "../redux/reducers/user/userThunk";
import { jobApi } from "./reducers/jobs/jobThunk";
import { packageApi } from "./reducers/package/packageThunk";


export const store = configureStore({
  reducer: {
    user: userReducer,
    job:jobReducer,
    package:packageReducer,
    [userApi.reducerPath]: userApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      jobApi.middleware,
      packageApi.middleware
    ]),
});
setupListeners(store.dispatch);