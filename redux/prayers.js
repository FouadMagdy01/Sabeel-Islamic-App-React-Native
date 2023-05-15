import {createSlice} from '@reduxjs/toolkit';

const prayersSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    savePrayers: (state, action) => {
      return action.payload.prayers;
    },
  },
});

export const savePrayers = prayersSlice.actions.savePrayers;

export default prayersSlice.reducer;
