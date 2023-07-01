import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import postReducer from './post/postSlice';
import reminderReducer from './reminder/reminderSlice';
import commentsSlice from './comments/commentsSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const postPersistConfig = {
  key: 'post',
  storage,
};

const reminderPersistConfig = {
  key: 'reminder',
  storage,
};

const commentPersistConfig = {
  key: 'comment',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedPostReducer = persistReducer(postPersistConfig, postReducer);
const persistedReminderReducer = persistReducer(reminderPersistConfig, reminderReducer);
const persistedCommentReducer = persistReducer(commentPersistConfig, commentsSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    post: persistedPostReducer,
    reminder: persistedReminderReducer,
    comment: persistedCommentReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
