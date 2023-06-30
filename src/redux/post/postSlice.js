import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  savedPosts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost(state, action) {},
    likePost(state, action) {},
    addComment(state, action) {},
    repost(state, action) {},
    savePost(state, action) {},
    unsavePost(state, action) {},
  },
});

export const { createPost, likePost, addComment, repost, savePost, unsavePost } = postSlice.actions;

export default postSlice.reducer;
