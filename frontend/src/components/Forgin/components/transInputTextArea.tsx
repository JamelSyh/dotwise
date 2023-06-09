import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Keyboard, UploadOne, Close, ViewGridCard } from "@icon-park/react";
import {
  setKeyboard,
  setOutOpt,
  setPending,
  setInLang,
  setBrailleBoard,
  setOutLang,
  selectTranslatorState,
} from "app/translator/translator";
import { selectTranscriptorState, setInText, setBraille } from "app/transcriptor/transcriptor";
import TransDropdown from './transDropdown';
import TransDropdownGrade from "./transDropdownGrade";
// @ts-ignore
import brailleToNum from "../constants/brailleToNum";
// @ts-ignore
import brailleKeys from "../constants/brailleKeys";
import '../App.css';

function TransInputTextArea() {
  const dispatch = useAppDispatch();
  const translator = useAppSelector(selectTranslatorState);
  const transcriptor = useAppSelector(selectTranscriptorState);

  const inText = transcriptor.inText;
  const outText = transcriptor.outText;
  const inLang = transcriptor.inLang;
  const braille = transcriptor.braille;
  const inTrans = translator.inLang;
  const inTransOpt = translator.inOpt;
  const kb = translator.keyboard;
  const brailleBoard = translator.brailleBoard;

  const [brailleInput, setBrailleInput] = useState("");
  const [key, setKey] = useState("");


  const handleClear = () => {
    dispatch(setInText(""));
  };

  useEffect(() => {
    if (!braille) {
      dispatch(setInText(outText));
    }
  }, [])

  // @ts-ignore
  const handleKeyPress = (event) => {
    const newKey = brailleKeys[event.key.toLowerCase()];
    if (newKey) {
      setKey(newKey);
      setBrailleInput(brailleInput + newKey);
    }
    if (event.ctrlKey || event.metaKey) {
      event.stopPropagation();
      // Allow Ctrl+.. (or Cmd+C on Mac)
      return;
    }
    event.preventDefault();
  };

  useEffect(() => {
    const len = brailleInput.length;
    if (key) {
      if (key === "backspace") {
        dispatch(setInText(inText.slice(0, inText.length - 1)));
        setBrailleInput(key);
      } else if (key === " ") {
        dispatch(setInText(inText + "  "));
        setBrailleInput("");
      } else if (key <= brailleInput.charAt(len - 2)) {
        // @ts-ignore
        if (brailleToNum[key]) dispatch(setInText(inText + brailleToNum[key]));
        setBrailleInput(key);
      } else {
        // @ts-ignore
        if (brailleToNum[brailleInput])
          // @ts-ignore
          dispatch(setInText(inText.slice(0, inText.length - 1) + brailleToNum[brailleInput]));
      }
      setKey("");
    }
  }, [brailleInput, key]);

  useEffect(() => {
    if (inTrans[0].code === "1" || inTrans.code === "2") {
      setBraille(true);
    }
    else {
      setBraille(false);
      dispatch(setBrailleBoard(false));
      inTransOpt.forEach((lang: any) => {
        if (lang === inTrans[0])
          dispatch(setOutOpt(lang.grade));
      })
    }
  }, [inTrans[0]]);

  return (
    <div className="card input-wrapper">
      <div className="from">
        <span className="heading">From:</span>
        <TransDropdown id="in" opt={inTransOpt} lang={inTrans} />
        <TransDropdownGrade id="in" opt={inTrans} lang={inTrans} />
      </div>
      <div className="text-area">
        {inText !== "" && (
          <div className="clear-btn" onClick={handleClear}>
            <Close theme="outline" size="23" strokeWidth={3} />
          </div>
        )}
        <textarea
          className="custom-textarea"
          id="input-text"
          cols={30}
          rows={6}
          value={inText}
          onChange={(event) => {
            dispatch(setInText(event.target.value));
          }}
          onKeyDown={handleKeyPress}
        ></textarea>
        <div className="chars">
          <span id="input-chars">{inText.length}</span> / 5000
        </div>
      </div>
      <div className="card-bottom">
        <div className="icoon" onClick={() => {
          dispatch(setKeyboard(!kb));
          dispatch(setBrailleBoard(false));
        }} >
          <Keyboard size="30" strokeWidth={3} />
        </div>
        <div className="icoon" onClick={() => {
          dispatch(setBrailleBoard(!brailleBoard));
          dispatch(setKeyboard(false));
        }} >
          <ViewGridCard size="30" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}

export default TransInputTextArea;
