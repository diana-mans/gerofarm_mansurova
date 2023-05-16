import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  userTitles: [],
  screenWidth: 0,
  screenHeight: 0,
};

export const titleSlice = createSlice({
  name: 'titles',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setUserTitles(state, action) {
      state.userTitles = action.payload;
    },
    setHeight(state, action) {
      state.screenHeight = action.payload;
    },
    setWidth(state, action) {
      state.screenWidth = action.payload;
    },
  },
});

export const { setItems, setUserTitles, setWidth, setHeight } = titleSlice.actions;

export default titleSlice.reducer;
