// src/store.ts

import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../reducer/todoReducer';

// Configure Redux store
const store = configureStore({
  reducer: {
    todos: todoReducer,  // Add todoReducer here
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;

