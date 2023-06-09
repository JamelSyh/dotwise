import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

// Interfaces

interface SearchState {
  inText: string;
  inLang: any;
  inOpt: any;
  data: any
  pending: any;
  keyboard: any;
  brailleBoard: any;
}

// Initial state
const initialState: SearchState = {
  inText: "",
  inLang: { code: "en", name: "English" },
  inOpt: [{ code: "en", name: "English" }],
  data: [{ contraction: "empty", unicode: "empty" }],
  pending: false,
  keyboard: false,
  brailleBoard: false,
};

// Slice
export const SearchSlice = createSlice({
  name: "Search",
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
  setInLang,
  setInOpt,
  setPending,
  setKeyboard,
  setBrailleBoard,
  setData,
} = SearchSlice.actions;

// Selector
export const selectSearchState = (state: RootState) => state.search;

export default SearchSlice.reducer;

