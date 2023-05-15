import {configureStore} from '@reduxjs/toolkit';
import todos from './todos';
import prayers from './prayers';
export const store = configureStore({
  reducer: {
    todos: todos,
    prayers: prayers,
  },
});
