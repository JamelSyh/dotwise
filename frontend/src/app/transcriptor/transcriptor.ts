import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface Language {
  code: string;
  name: string;
  native?: string;
  grade?: { code: string; name: string }[];
}

interface TranscriptorState {
  inText: string;
  outText: string;
  inLang: Language;
  outLang: Language;
  inOpt: Language[];
  outOpt: Language[];
  inDrop: boolean;
  outDrop: boolean;
  pending: boolean;
  braille: boolean;
  keyboard: boolean;
  brailleBoard: boolean;
}

const initialState: TranscriptorState = {
  inText: "",
  outText: "",
  braille: false,
  inLang: {
    code: "auto",
    name: "Auto",
    native: "Detect",
    grade: [{ code: "1", name: "Grade 1" }],
  },
  outLang: { code: "1", name: "Grade 1" },
  inOpt: [
    {
      code: "auto",
      name: "Auto",
      native: "Detect",
      grade: [{ code: "1", name: "Grade 1" }],
    },
  ],
  outOpt: [{ code: "1", name: "Grade 1" }],
  inDrop: false,
  outDrop: false,
  pending: false,
  keyboard: false,
  brailleBoard: false,
};

export const transcriptorSlice = createSlice({
  name: "transcriptor",
  initialState,
  reducers: {
    setInText: (state, action: PayloadAction<string>) => {
      state.inText = action.payload;
    },
    setOutText: (state, action: PayloadAction<string>) => {
      state.outText = action.payload;
    },
    setInLang: (state, action: PayloadAction<Language>) => {
      state.inLang = action.payload;
    },
    setOutLang: (state, action: PayloadAction<Language>) => {
      state.outLang = action.payload;
    },
    setInOpt: (state, action: PayloadAction<Language[]>) => {
      state.inOpt = action.payload;
    },
    setOutOpt: (state, action: PayloadAction<Language[]>) => {
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
    setBraille: (state, action: PayloadAction<boolean>) => {
      state.braille = action.payload;
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
  setBraille,
} = transcriptorSlice.actions;

export const selectTranscriptorState = (state: RootState) =>
  state.transcriptor;

export default transcriptorSlice.reducer;
