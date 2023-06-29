import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import postReducer from './post/postSlice';
import reminderReducer from './reminder/reminderSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedPostReducer = persistReducer(persistConfig, postReducer);
const persistedReminderReducer = persistReducer(persistConfig, reminderReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    post: persistedPostReducer,
    reminder: persistedReminderReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
