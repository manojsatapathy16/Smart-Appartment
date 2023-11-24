'use client';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'

import userSlice from '../Reducers/userSlice';
const persistConfig:any = {
  key: 'root',
  storage: storage,
  // whitelist: ['userdata'],
};
const rootReducer = combineReducers({
  userdata: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
 export const store= configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      immutableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;