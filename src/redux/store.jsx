import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../redux/reducers/user/userSlice";
import jobReducer from "../redux/reducers/jobs/jobSlice";
import packageReducer from "../redux/reducers/package/packageSlice";
import chatReducer from "../redux/reducers/messages/messagesSlice";
import { userApi } from "../redux/reducers/user/userThunk";
import { jobApi } from "./reducers/jobs/jobThunk";
import { packageApi } from "./reducers/package/packageThunk";
import {messagesApi} from "./reducers/messages/messagesThunk"


export const store = configureStore({
  reducer: {
    user: userReducer,
    job:jobReducer,
    package:packageReducer,
    chat:chatReducer,
    [userApi.reducerPath]: userApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [messagesApi.reducerPath]:messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      jobApi.middleware,
      packageApi.middleware,
      messagesApi.middleware
    ]),
});
setupListeners(store.dispatch);