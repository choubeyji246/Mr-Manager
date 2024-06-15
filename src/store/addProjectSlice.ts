import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import getResponse from "../utils/httpResponse";
import { endpoints } from "../constants/endPoint";

interface ProjectState {
  projects: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const addProjectSlice = createSlice({
  name: "addProjects",
  initialState,
  reducers: {
    addProjectStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProjectSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.projects.push(action.payload);
    },
    addProjectFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addProjectStart, addProjectSuccess, addProjectFailure } =
  addProjectSlice.actions;

export const addProject = (projectData: any) => async (dispatch: any) => {
  dispatch(addProjectStart());
  try {
    const response: AxiosResponse = await getResponse(
      "post",
      endpoints.addProject,
      projectData
    );
    dispatch(addProjectSuccess(response.data));
    return response
  } catch (error:any) {
    dispatch(addProjectFailure(error.message));
  }
};

export default addProjectSlice.reducer;
