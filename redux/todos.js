import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    saveGoals: (state, action) => {
      return action.payload.goals;
    },
  },
});

export const saveGoals = todoSlice.actions.saveGoals;

export default todoSlice.reducer;
