import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { ALL_POSTS } from '../DUMMY_DATA';

const initialState = {
  allPosts: ALL_POSTS,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    createPost(state, action) {
      const post = {
        commentIds: [],
        createdAt: dayjs().valueOf(),
        description: action.payload.description,
        isRepost: false,
        likes: 0,
        title: action.payload.title,
        id: action.payload.id,
        postedUserId: action.payload.postedUserId,
        postImage: action.payload.postImage,
      };

      return { ...state, allPosts: [...state.allPosts, post] };
    },
    updatePostComment(state, action) {
      state.allPosts = state.allPosts.map((post) => {
        if (post.id === action.payload.postId) {
          post.commentIds = [...post.commentIds, action.payload.commentId];
        }
        return post;
      });
    },
    likePost(state, action) {
      state.allPosts = state.allPosts.map((post) => {
        if (post.id === action.payload.postId) {
          post.likes = action.payload.likes;
        }
        return post;
      });
    },
    deletePost(state, action) {
      state.allPosts = state.allPosts.filter((post) => post.id !== action.payload.id);
    },
    updatePost(state, action) {
      state.allPosts = state.allPosts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            title: action.payload.title,
            description: action.payload.description,
            postImage: action.payload.postImage,
          };
        } else return post;
      });
    },
  },
});

export const { createPost, likePost, repost, updatePostComment, deletePost, updatePost } =
  postSlice.actions;

export default postSlice.reducer;
