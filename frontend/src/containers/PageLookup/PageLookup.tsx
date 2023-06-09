import React, { useState, useEffect } from "react";
import SearchDropdown from "components/Forgin/components/searchDropdown";
import Table from "components/Forgin/components/Table";
import Search from "./../../components/Forgin/components/search";
import VKeyboard from 'components/Forgin/components/keyboard';
import BrailleBoard from 'components/Forgin/components/brailleBoard';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Keyboard, ViewGridCard, Voice } from "@icon-park/react";

import brailleToNum from "components/Forgin/constants/brailleToNum";
import brailleKeys from "components/Forgin/constants/brailleKeys";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { setKeyboard, setBrailleBoard, selectSearchState } from "app/search/search";
import { setInText, selectTranscriptorState } from "app/transcriptor/transcriptor";


function Lookup() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearchState);
  const transcriptor = useAppSelector(selectTranscriptorState);



  const inText = transcriptor.inText;
  const lang = search.inLang;
  const data = search.data;
  const kb = search.keyboard;
  const brailleBoard = search.brailleBoard;
  const [filteredList, setFilteredList] = useState(data ? data : []);
  const [brailleMode, setBrailleMode] = useState(false);
  const [brailleInput, setBrailleInput] = useState("")

  const [key, setKey] = useState('');
  // const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  // const voiceList = {
  //   'auto': voices[1],
  //   'en': voices[1],
  //   'fr': voices[6],
  // }
  // const speechList = {
  //   'auto': '',
  //   'en': 'en-US',
  //   'fr': 'fr-FR',
  //   'ar': 'ar-SA'
  // }
  // const { transcript, resetTranscript, listening } = useSpeechRecognition();


  // const handleStartRecognition = () => {
  //   if (listening) {
  //     SpeechRecognition.stopListening();
  //   } else {
  //     resetTranscript();
  //     SpeechRecognition.startListening({ continuous: false, language: speechList[lang.code] });
  //   }
  // };

  useEffect(() => {
    setFilteredList(data ? data : []);
  }, [data]);

  // const handleSpeech = () => {
  //   if (listening)
  //     SpeechRecognition.stopListening();
  //   if (inText && !speaking && voiceList[lang.code]) {
  //     speak({ text: inText, voice: voiceList[lang.code] });
  //   }
  // }

  // useEffect(() => {
  //   dispatch(inputText(transcript));
  // }, [transcript, dispatch]);

  const filterBySearch = (event: any) => {
    // Access input value
    const query = event.target.value;
    dispatch(setInText(query));
    // console.log(data);
    // Create copy of item list
    // Include all elements which includes the search query
    // @ts-ignore
    var updatedList = data.filter((item) => {
      return ((item.contraction.toLowerCase().indexOf(query.toLowerCase())) && item.word.toLowerCase().indexOf(query.toLowerCase()) && item.braille.toLowerCase().indexOf(query.toLowerCase())) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  const handleKeyPress = (e: any) => {
    if (brailleMode) {
      const newKey = brailleKeys[e.key.toLowerCase()];
      if (newKey) {
        setKey(newKey);
        setBrailleInput(brailleInput + newKey)
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    const len = brailleInput.length
    if (key) {
      if (key === "backspace") {
        dispatch(setInText(inText.slice(0, inText.length - 1)));
        setBrailleInput(key);
      } else if (key == " ") {
        dispatch(setInText(inText + "  "));
        setBrailleInput("");
      }
      else if (key <= brailleInput.charAt(len - 2)) {
        if (brailleToNum[key])
          dispatch(setInText(inText + brailleToNum[key]));
        setBrailleInput(key);
      } else {
        if (brailleToNum[brailleInput])
          dispatch(setInText(inText.slice(0, inText.length - 1) + brailleToNum[brailleInput]));
      }
      setKey('');
    }
  }, [brailleInput, key]);

  return (

    <>
      <Search />
      <main>
        <div className="container">
          <div className="lookup-container">
            <div className="search-bar">
              <input type="text" className="input custom-input" placeholder='search' value={inText} onChange={filterBySearch} onKeyUp={filterBySearch} onKeyDown={handleKeyPress} maxLength={20} />
              <div className="flBtnCntr">
                <button className="flBtnBox big">+</button>
                <div className="flBtns">
                  {/* <button className={`flBtnBox small ${listening ? 'active-float-btn' : ''}`} onClick={handleStartRecognition}> */}
                  {/*   <Voice theme="outline" size="20" strokeWidth={3} /> */}
                  {/* </button> */}
                  <button className={`flBtnBox small ${kb ? 'active-float-btn' : ''}`} onClick={() => { dispatch(setKeyboard(!kb)); dispatch(setBrailleBoard(false)); }}>
                    <Keyboard size="20" strokeWidth={3} />
                  </button>
                  <button className={`flBtnBox small ${brailleBoard ? 'active-float-btn' : ''}`} onClick={() => { dispatch(setBrailleBoard(!brailleBoard)); dispatch(setKeyboard(false)) }}>
                    <ViewGridCard size="20" strokeWidth={3} />

                  </button>
                  <button className={`flBtnBox small ${brailleMode ? 'active-float-btn' : ''}`} onClick={() => { setBrailleMode(!brailleMode); }}>B</button>
                </div>
              </div>
              <div className="lang-search">
                <SearchDropdown />
              </div>
            </div>
            {brailleBoard && <BrailleBoard />}
            {kb && <div className="keyboard-container"><VKeyboard grade={brailleMode ?? null} inLang={lang} /> </div>}
            <div className="result-container">
              <Table data={filteredList} rowsPerPage={10} />
            </div>
          </div>
        </div >
      </main>
    </>
  );
}

export default Lookup;
