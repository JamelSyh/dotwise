import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setInText, setOutText, switchLang, switchOpt, switchText, selectTranscriptorState } from "app/transcriptor/transcriptor";
import InputTextArea from 'components/Forgin/components/inputTextArea';
import OutputTextArea from 'components/Forgin/components/outputTextArea';
// import { TransferData } from "@icon-park/react";
import Convert from "components/Forgin/components/convert";


// @ts-ignore
import VKeyboard from 'components/Forgin/components/keyboard';
// @ts-ignore
import BrailleBoard from 'components/Forgin/components/brailleBoard';
import './App.css';




function Transcriptor() {


  const dispatch = useAppDispatch();
  const transcriptor = useAppSelector(selectTranscriptorState);

  const kb = transcriptor.keyboard;
  const brailleBoard = transcriptor.brailleBoard;
  const inLang = transcriptor.inLang;


  const swap = () => {
    dispatch(switchOpt());
    dispatch(switchLang());
    dispatch(switchText());
  }


  return (
    <>
      <Convert />
      <main>
        <div className="container">
          <div className="input-container">
            <InputTextArea />
            <div className="center">
              <div className="swap-position" onClick={swap}>
                <i className="fa-solid fa-arrow-right-arrow-left"></i>
              </div>
            </div>
            <OutputTextArea />
          </div>
        </div>
        {brailleBoard && <BrailleBoard />}
        {kb && <VKeyboard inLang={inLang} />}
      </main>
    </>
  );
}

export default Transcriptor;
