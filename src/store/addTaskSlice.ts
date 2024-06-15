import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import getResponse from "../utils/httpResponse";
import { endpoints } from "../constants/endPoint";

interface TaskState {
  tasks: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const addTaskSlice = createSlice({
  name: "addTasks",
  initialState,
  reducers: {
    addTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTaskSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    addTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addTaskStart, addTaskSuccess, addTaskFailure } = addTaskSlice.actions;

export const addTask = (taskData: any) => async (dispatch: any) => {
  dispatch(addTaskStart());
  try {
    const response: AxiosResponse = await getResponse(
      "post",
      endpoints.addTask,
      taskData
    );
    dispatch(addTaskSuccess(response.data));
    return response
  } catch (error:any) {
    dispatch(addTaskFailure(error.message));
  }
};

export default addTaskSlice.reducer;
