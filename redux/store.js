// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import userReducer from "../features/userSlice"; // Replace with your actual user slice
import communityReducer from "../features/communitySlice";
import channelReducer from "../features/channelSlice";
import memberReducer from "../features/memberSlice";

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  community: communityReducer,
  channel: channelReducer,
  member: memberReducer,
  // Add more reducers here if you have them
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
