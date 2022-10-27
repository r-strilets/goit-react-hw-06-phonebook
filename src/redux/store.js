import { configureStore } from '@reduxjs/toolkit';
import phoneContactsSlice from './contactSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { filterReducer } from './contactsFilterSlice';

const persistConfig = {
  key: 'phoneContacts',
  storage,
};


const persistedReducer = persistReducer(persistConfig, phoneContactsSlice);

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    phoneContacts: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);