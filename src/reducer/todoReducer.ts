// src/reducers/todoReducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Todo type
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

// Initial state for the todos
const initialState: TodoState = {
  todos: [],
};

// Create slice for todo reducer
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Action to add a new todo
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    // Action to toggle todo completion status
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // Action to delete a todo
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
  },
});

// Export the actions to use in components
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

// Export the reducer for use in the store
export default todoSlice.reducer;
