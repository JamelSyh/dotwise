import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

// Interfaces

interface Grade {
  code: string;
  name: string
}

interface Language {
  code?: string;
  name?: string;
  native?: string;
  grade?: Grade;
}

interface TranslatorState {
  inText: string;
  outText: string;
  inLang: any;
  outLang: any;
  inOpt: any;
  outOpt: any;
  inDrop: any;
  outDrop: any;
  pending: any;
  keyboard: any;
  brailleBoard: any;
}

// Initial state
const initialState: TranslatorState = {
  inText: "",
  outText: "",
  inLang: [
    { code: "fr", name: "French", native: "francais", grade: { code: "1", name: "Grade 1" } }, [{ code: "1", name: "Grade 1" }]
  ],
  outLang: [
    { code: "en", name: "English", native: "english", grade: { code: "1", name: "Grade 1" } }, [{ code: "1", name: "Grade 1" }]
  ],
  inOpt: [
    [[{ code: "en", name: "English", native: "english", grade: { code: "1", name: "Grade 1" } }], [{ code: "1", name: "Grade 1" }]],
  ],
  outOpt: [
    [[{ code: "en", name: "English", native: "english", grade: { code: "1", name: "Grade 1" } }], [{ code: "1", name: "Grade 1" }]],
  ],
  inDrop: false,
  outDrop: false,
  pending: false,
  keyboard: false,
  brailleBoard: false,
};

// Slice
export const TranslatorSlice = createSlice({
  name: "Translator",
  initialState,
  reducers: {
    setInText: (state, action: PayloadAction<string>) => {
      state.inText = action.payload;
    },
    setOutText: (state, action: PayloadAction<string>) => {
      state.outText = action.payload;
    },
    setInLang: (state, action: PayloadAction<Language[]>) => {
      state.inLang = action.payload;
    },
    setOutLang: (state, action: PayloadAction<Language[]>) => {
      state.outLang = action.payload;
    },
    setInOpt: (state, action: PayloadAction<Language[][]>) => {
      state.inOpt = action.payload;
    },
    setOutOpt: (state, action: PayloadAction<Language[][]>) => {
      state.outOpt = action.payload;
    },
    setInDrop: (state, action: PayloadAction<boolean>) => {
      state.inDrop = action.payload;
    },
    setOutDrop: (state, action: PayloadAction<boolean>) => {
      state.outDrop = action.payload;
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
    switchLang: (state) => {
      const { inLang, outLang } = state;
      state.inLang = outLang;
      state.outLang = inLang;
    },
    switchOpt: (state) => {
      const { inOpt, outOpt } = state;
      state.inOpt = outOpt;
      state.outOpt = inOpt;
    },
    switchText: (state) => {
      const { inText, outText } = state;
      state.inText = outText;
      state.outText = inText;
    },
  },
});

export const {
  setInText,
  setOutText,
  setInLang,
  setOutLang,
  setInOpt,
  setOutOpt,
  setInDrop,
  setOutDrop,
  setPending,
  setKeyboard,
  setBrailleBoard,
  switchLang,
  switchOpt,
  switchText,
} = TranslatorSlice.actions;

// Selector
export const selectTranslatorState = (state: RootState) => state.translator;

export default TranslatorSlice.reducer;
