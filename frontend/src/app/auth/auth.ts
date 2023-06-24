// @ts-nocheck
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { isEqual } from "lodash";

const initialState = {
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL,
  DOTWISE_API_KEY: import.meta.env.VITE_DOTWISE_API_KEY,
  LANG_DETECT_API_KEY: import.meta.env.VITE_DETECT_LANG_API_KEY,
  OCR_API_KEY: import.meta.env.VITE_OCR_API_KEY,
  user: JSON.parse(localStorage.getItem("user") as string),
  token: JSON.parse(localStorage.getItem("authToken") as string),
  profile:
  {
    id: 1,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    gender: "",
    avatar: "https://res.cloudinary.com/dz3frffba/image/upload/v1687457552/media/profile/default.jpg",
    bgImage: "",
    count: 0,
    href: "/author/1",
    desc: "",
    jobName: "",
    api_key: null,
    role: 'U',
  },
  profiles: [{
    id: 1,
    firstName: "",
    lastName: "",
    displayName: "",
    api_key: null,
    role: 'U',
    email: "",
    gender: "",
    avatar: "https://res.cloudinary.com/dz3frffba/image/upload/v1687457552/media/profile/default.jpg",
    bgImage: "",
    count: 0,
    href: "/author/1",
    desc: "",
    jobName: ""
  },
  ],
  pending: false,
  errMsg: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      if (!isEqual(state.user, action.payload)) {
        state.user = action.payload;
      }
    },
    setProfile: (state, action: PayloadAction<any>) => {
      if (!isEqual(state.profile, action.payload)) {
        state.profile = action.payload;
      }

    },
    setProfiles: (state, action: PayloadAction<any>) => {
      if (!isEqual(state.profiles, action.payload)) {
        state.profiles = action.payload;
      }

    },
    setToken: (state, action: PayloadAction<string | null>) => {
      if (!isEqual(state.token, action.payload)) {
        state.token = action.payload;
      }
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      if (!isEqual(state.pending, action.payload)) {
        state.pending = action.payload;
      }
    },
    setErrMsg: (state, action: PayloadAction<string>) => {
      if (!isEqual(state.errMsg, action.payload)) {
        state.errMsg = action.payload;
      }
    },
  },
});

export const {
  setUser,
  setProfile,
  setProfiles,
  setToken,
  setPending,
  setErrMsg,
} = AuthSlice.actions;

export const selectAuthState = (state: RootState) =>
  state.auth;

export default AuthSlice.reducer;
