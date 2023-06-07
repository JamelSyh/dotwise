import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";


const initialState = {
  inText: "",
  outText: "",
  inLang: { code: "auto", name: "Auto", native: "Detect", grade: [{ code: "1", name: "Grade 1" }] },
  outLang: { code: "1", name: "Grade 1" },
  inOpt: [{ code: "auto", name: "Auto", native: "Detect", grade: [{ code: "1", name: "Grade 1" }] }],
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
      state = {
        ...state,
        inText: action.payload,
      };
      return state;
    },
    setOutText: (state, action: PayloadAction<string>) => {
      state = {
        ...state,
        outText: action.payload,
      };
      return state;
    },
    setInLang: (state, action: PayloadAction<any>) => {
      state = {
        ...state,
        inLang: action.payload,
      };
      return state;
    },
    setOutLang: (state, action: PayloadAction<any>) => {
      state = {
        ...state,
        outLang: action.payload,
      };
      return state;
    },
    setInOpt: (state, action: PayloadAction<any>) => {
      state = {
        ...state,
        inOpt: action.payload,
      };
      return state;
    },
    setOutOpt: (state, action: PayloadAction<any>) => {
      state = {
        ...state,
        outOpt: action.payload,
      };
      return state;
    },
    setInDrop: (state, action: PayloadAction<boolean>) => {
      state = {
        ...state,
        inDrop: action.payload,
      };
      return state;
    },
    setOutDrop: (state, action: PayloadAction<boolean>) => {
      state = {
        ...state,
        outDrop: action.payload,
      };
      return state;
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state = {
        ...state,
        pending: action.payload,
      };
      return state;
    },
    setKeyboard: (state, action: PayloadAction<boolean>) => {
      state = {
        ...state,
        keyboard: action.payload,
      };
      return state;
    },
    setBrailleBoard: (state, action: PayloadAction<boolean>) => {
      state = {
        ...state,
        brailleBoard: action.payload,
      };
      return state;
    },
  },
});

export const { setInText, setOutText } =
  transcriptorSlice.actions;

export const selectTranscriptorState = (state: RootState) =>
  state.transcriptor;


export default transcriptorSlice.reducer;

