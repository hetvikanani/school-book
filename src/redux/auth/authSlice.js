import { createSlice } from '@reduxjs/toolkit';
import { generateUniqueId } from '../../utils';

const initialState = {
  allUsers: [
    {
      id: 'ljikoodg-p2mwt',
      name: 'bhavya',
      email: 'pbhavy4@gmail.com',
      password: '123456',
      college: 'Marwadi',
      dob: 1688129443709,
      image: null,
      savedPost: [],
      myPosts: ['123456789', '1234567890', '12345678901'],
      likedPost: [],
    },
  ],
  loggedInUserId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action) {
      const user = {
        id: generateUniqueId(),
        ...action.payload,
        savedPost: [],
        myPosts: [],
        likedPost: [],
      };
      state.allUsers.push(user);
    },
    loginUser(state, action) {
      state.isLoggedIn = true;
      state.loggedInUserId = action.payload.id;
    },
    logoutUser(state) {
      state.loggedInUserId = null;
      state.isLoggedIn = false;
    },
    updateProfile(state, action) {
      state.allUsers = state.allUsers.map((user) =>
        user.id === action.payload.id ? action.payload : user,
      );
    },
    updatePostInUser(state, action) {
      state.allUsers = state.allUsers.map((user) =>
        user.id === action.payload.id
          ? { ...user, myPosts: [...user.myPosts, action.payload.postId] }
          : user,
      );
    },
    updateSavedPostInUser(state, action) {
      state.allUsers = state.allUsers.map((user) =>
        user.id === action.payload.id
          ? {
              ...user,
              savedPost: user.savedPost.includes(action.payload.postId)
                ? user.savedPost.filter((savedPostId) => savedPostId !== action.payload.postId)
                : [...user.savedPost, action.payload.postId],
            }
          : user,
      );
    },
    updateLikedPostInUser(state, action) {
      state.allUsers = state.allUsers.map((user) =>
        user.id === action.payload.id
          ? {
              ...user,
              likedPost: user.likedPost.includes(action.payload.postId)
                ? user.likedPost.filter((likedPostId) => likedPostId !== action.payload.postId)
                : [...user.likedPost, action.payload.postId],
            }
          : user,
      );
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
  updatePostInUser,
  updateSavedPostInUser,
  updateLikedPostInUser,
} = authSlice.actions;

export default authSlice.reducer;
