import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./features/useSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import  chatSlice from "./features/chatSlice";

const saveUserOnlyFiler = createFilter("user");
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transform: [saveUserOnlyFiler],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  chat:chatSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
