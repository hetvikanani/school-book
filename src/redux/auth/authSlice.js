import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action) {},
    loginUser(state, action) {
      state.isLoggedIn = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateProfile(state, action) {},
  },
});

export const { registerUser, loginUser, logoutUser, updateProfile } = authSlice.actions;

export default authSlice.reducer;
