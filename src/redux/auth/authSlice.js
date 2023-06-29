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
    loginUser(state, action) {},
    logoutUser(state) {},
    updateProfile(state, action) {},
  },
});

export const { registerUser, loginUser, logoutUser, updateProfile } =
  authSlice.actions;

export default authSlice.reducer;
