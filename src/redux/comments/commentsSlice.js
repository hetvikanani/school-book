import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { ALL_COMMENTS } from '../DUMMY_DATA';

const initialState = {
  allComments: ALL_COMMENTS,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    createComment(state, action) {
      state.allComments.push({
        id: action.payload.id,
        title: action.payload.title,
        userId: action.payload.userId,
        createdAt: dayjs().valueOf(),
        postId: action.payload.postId,
      });
    },
  },
});

export const { createComment } = commentSlice.actions;

export default commentSlice.reducer;
