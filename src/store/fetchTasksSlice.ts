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

const fetchTasksSlice = createSlice({
  name: "fetchTasks",
  initialState,
  reducers: {
    fetchTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTaskSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    fetchTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchTaskStart, fetchTaskSuccess, fetchTaskFailure } =
  fetchTasksSlice.actions;

export const fetchTasks = (projectId: any) => async (dispatch: any) => {
  dispatch(fetchTaskStart());
  try {
    //console.log('urlllllllll',endpoints.getTask+`?projectId=${projectId}`);
    
    const response: AxiosResponse = await getResponse(
      "get",
      endpoints.getTask+`?projectId=${projectId}`,
    );
    dispatch(fetchTaskSuccess(response.data));
    return response
  } catch (error:any) {
    dispatch(fetchTaskFailure(error.message));
  }
};

export default fetchTasksSlice.reducer;
