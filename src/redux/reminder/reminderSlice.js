import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reminders: [],
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    createReminder(state, action) {},
    editReminder(state, action) {},
    deleteReminder(state, action) {},
  },
});

export const { createReminder, editReminder, deleteReminder } =
  reminderSlice.actions;

export default reminderSlice.reducer;
