
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

// Interfaces

interface GlobalState {
  inText: string;
  inLang: any;
  inOpt: any;
  data: any
  pending: any;
  keyboard: any;
  brailleBoard: any;
}

// Initial state
const initialState: GlobalState = {
  inText: "",
  inLang: { code: "en", name: "English" },
  inOpt: [{ code: "en", name: "English" }],
  data: [{ contraction: "empty", unicode: "empty" }],
  pending: false,
  keyboard: false,
  brailleBoard: false,
};

// Slice
export const GlobalSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
    setInText: (state, action: PayloadAction<string>) => {
      state.inText = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setInLang: (state, action: PayloadAction<any>) => {
      state.inLang = action.payload;
    },
    setInOpt: (state, action: PayloadAction<any>) => {
      state.inOpt = action.payload;
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state.pending = action.payload;
    },
    setKeyboard: (state, action: PayloadAction<boolean>) => {
      state.keyboard = action.payload;
    },
    setBrailleBoard: (state, action: PayloadAction<boolean>) => {
      state.brailleBoard = action.payload;
    },
  },
});

export const {
  setInText,
} = GlobalSlice.actions;

// Selector
export const selectGlobalState = (state: RootState) => state.global;

export default GlobalSlice.reducer;

