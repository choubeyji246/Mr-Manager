import { configureStore } from "@reduxjs/toolkit";
import addProjectsReducer from "./addProjectSlice";
import fetchTasksReducer from './fetchTasksSlice'
import  addTasksReducer  from "./addTaskSlice";

export const store = configureStore({
  reducer: {
    addProjects: addProjectsReducer,
    fetchTasks: fetchTasksReducer,
    addTask: addTasksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
