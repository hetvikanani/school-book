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
      state.allUsers = state.allUsers.map((user) => {
        if (user.id === action.payload.id) {
          const isPostAlreadySaved = user.savedPost.filter(
            (savedPostId) => savedPostId === action.payload.postId,
          );
          if (isPostAlreadySaved.length > 0) {
            return {
              ...user,
              savedPost: user.savedPost.filter(
                (savedPostId) => savedPostId !== action.payload.postId,
              ),
            };
          } else return { ...user, savedPost: [...user.savedPost, action.payload.postId] };
        } else return user;
      });
    },
    updateLikedPostInUser(state, action) {
      state.allUsers = state.allUsers.map((user) => {
        if (user.id === action.payload.id) {
          const isPostAlreadySaved = user.likedPost.filter(
            (likedPostId) => likedPostId === action.payload.postId,
          );
          if (isPostAlreadySaved.length > 0) {
            return {
              ...user,
              likedPost: user.likedPost.filter(
                (likedPostId) => likedPostId !== action.payload.postId,
              ),
            };
          } else return { ...user, likedPost: [...user.likedPost, action.payload.postId] };
        } else return user;
      });
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
