import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/auth-slice";
import announcementReducer from "./announcement/announcement-slice";
import eventReducer from "./event/event-slice";
import dashboardReducer from "./dashboard/dashboard-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "user",
  storage,
  // whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    announcement: announcementReducer,
    event: eventReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
