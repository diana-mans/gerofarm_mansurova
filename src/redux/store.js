import { configureStore } from '@reduxjs/toolkit';
import titles from './slices/titleSlices';

const store = configureStore({
  reducer: { titles },
});

export default store;
