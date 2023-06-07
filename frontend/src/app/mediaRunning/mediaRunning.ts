import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { PostDataType } from "data/types";

export interface MediaRunningState {
  postData?: PostDataType;
  state?: "loading" | "playing" | "paused" | "ended" | null;
  listPostAudio?: PostDataType[];
}

const initialState: MediaRunningState = {};

export const mediaRunningSlice = createSlice({
  name: "mediaRunning",
  initialState,
  reducers: {
    changeCurrentMediaRunning: (
      state,
      action: PayloadAction<MediaRunningState>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    changeStateMediaRunning: (
      state,
      action: PayloadAction<MediaRunningState["state"]>
    ) => {
      return {
        ...state,
        state: action.payload,
      };
    },
    removeMediaRunning: (state) => {
      return {
        listPostAudio: state.listPostAudio,
      };
    },
    //
    addNewListPostAudio: (state, action: PayloadAction<PostDataType>) => {
      return {
        ...state,
        listPostAudio: [...(state.listPostAudio || []), action.payload],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeCurrentMediaRunning,
  changeStateMediaRunning,
  removeMediaRunning,
  addNewListPostAudio,
} = mediaRunningSlice.actions;

export const selectCurrentMediaRunning = (state: RootState) =>
  state.mediaRunning;

export default mediaRunningSlice.reducer;
