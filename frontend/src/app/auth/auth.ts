import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

const initialState = {
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL,
  DOTWISE_API_KEY: import.meta.env.VITE_DOTWISE_API_KEY,
  LANG_DETECT_API_KEY: import.meta.env.VITE_DETECT_LANG_API_KEY,
  OCR_API_KEY: import.meta.env.VITE_OCR_API_KEY,
  user: JSON.parse(localStorage.getItem("user") as string),
  token: JSON.parse(localStorage.getItem("authToken") as string),
  pending: false,
  errMsg: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state.pending = action.payload;
    },
    setErrMsg: (state, action: PayloadAction<string>) => {
      state.errMsg = action.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  setPending,
  setErrMsg,
} = AuthSlice.actions;

export const selectAuthState = (state: RootState) =>
  state.auth;

export default AuthSlice.reducer;
