// @ts-nocheck
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setInText, setKeyboard, setBraille, setOutOpt, setPending, setInLang, setBrailleBoard, setOutLang, selectTranscriptorState } from "app/transcriptor/transcriptor";
import { selectAuthState } from "app/auth/auth";
import { useSpeechSynthesis } from 'react-speech-kit';
// @ts-ignore
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Keyboard, UploadOne, Close, ViewGridCard, Voice, VolumeNotice, PauseOne } from "@icon-park/react";
// @ts-ignore
import brailleToNum from "../constants/brailleToNum";
// @ts-ignore
import brailleKeys from "../constants/brailleKeys";
import Dropdown from './dropdown';

function InputTextArea() {
  const dispatch = useAppDispatch();
  const transcriptor = useAppSelector(selectTranscriptorState);
  const auth = useAppSelector(selectAuthState);

  const inText = transcriptor.inText;
  const inLang = transcriptor.inLang;
  const outLang = transcriptor.outLang;
  const braille = transcriptor.braille;
  const inOpt = transcriptor.inOpt;
  const outOpt = transcriptor.outOpt;
  const kb = transcriptor.keyboard;
  const brailleBoard = transcriptor.brailleBoard;
  const dotwise_api_key = auth.DOTWISE_API_KEY;
  const ocr_api_key = auth.OCR_API_KEY;

  const [selectedFile, setSelectedFile] = useState(null);
  const [brailleInput, setBrailleInput] = useState("")
  const [key, setKey] = useState('');

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  const voiceList: { [key: string]: SpeechSynthesisVoice | undefined } = {
    'auto': voices[1],
    'en': voices[1],
    'fr': voices[6],
  }
  const speechList: { [key: string]: string } = {
    'auto': '',
    'en': 'en-US',
    'fr': 'fr-FR',
    'ar': 'ar-SA'
  }
  const OCRLangList: { [key: string]: string } = {
    'en': 'eng',
    'fr': 'fre',
    'ar': 'ara',
  }
  const { transcript, resetTranscript, listening } = useSpeechRecognition();


  const handleClear = () => {
    dispatch(setInText(""));
    setSelectedFile(null);
  }

  // @ts-ignore
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // @ts-ignore
  const uploadFile = async (file, lang, key) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apikey', ocr_api_key);
      formData.append('language', OCRLangList[lang]);

      const response = await axios.post(`https://api.ocr.space/parse/image/`, formData, {
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (inLang.code === "auto") {
      dispatch(setInLang(inOpt[2]));
      return;
    }
    const response = await uploadFile(selectedFile, inLang.code, dotwise_api_key);
    if (response) {
      dispatch(setInText(response.ParsedResults[0].ParsedText))
    }
  };

  useEffect(() => {
    if (selectedFile) {
      dispatch(setPending(true));
      handleUpload();
    }
  }, [selectedFile, inLang, dispatch]);


  const handleStartRecognition = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: speechList[inLang.code] });
    }
  };

  const handleSpeech = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
    if (inLang.code === "auto") {
      dispatch(setInLang(inOpt[2]));
    }
    if (inText && !speaking && voiceList[inLang.code]) {
      const voice = voiceList[inLang.code];
      if (voice) {
        const utterance = new SpeechSynthesisUtterance(inText);
        utterance.voice = voice;
        // @ts-ignore
        speak(utterance);
      }
    }
  };

  useEffect(() => {
    dispatch(setInText(transcript));
  }, [transcript, dispatch]);

  useEffect(() => {
    if (inLang.code === "1" || inLang.code === "2") {
      dispatch(setBraille(true));
    }
    else {
      dispatch(setBraille(false));
      dispatch(setBrailleBoard(false));
      inOpt.forEach((lang) => {
        if (lang === inLang)
          // @ts-ignore
          dispatch(setOutOpt(lang.grade));
      })
    }
  }, [inLang]);



  // @ts-ignore
  const handleKeyPress = (event) => {
    if (braille) {
      if (outLang.code == "auto")
        dispatch(setOutLang(outOpt[2]));
      const newKey = brailleKeys[event.key.toLowerCase()];
      if (newKey) {
        setKey(newKey);
        setBrailleInput(brailleInput + newKey)
      }
      if (event.ctrlKey || event.metaKey) {
        event.stopPropagation();
        // Allow Ctrl+.. (or Cmd+C on Mac)
        return;
      }
      event.preventDefault();
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
    <div className="card input-wrapper">
      <div className="from">
        <span className="heading">From :</span>
        <Dropdown id="in" opt={inOpt} lang={inLang} />
      </div>
      <div className="text-area">
        {inText !== "" && inLang.code !== "ar" && <div className="clear-btn" onClick={handleClear}> <Close theme="outline" size="23" strokeWidth={3} /></div>}
        <textarea className="custom-textarea" id="input-text" cols={30} rows={6} dir={inLang?.code === 'ar' ? 'rtl' : ''} value={inText} onChange={event => { dispatch(setInText(event.target.value)); }} onKeyDown={handleKeyPress}>
        </textarea>
        {inText !== "" && inLang.code === "ar" && <div className="clear-btn" onClick={handleClear}> <Close theme="outline" size="23" strokeWidth={3} /></div>}
        <div className="chars"><span id="input-chars">{inText.length}</span> / 5000</div>
      </div>
      <div className="card-bottom">
        <label htmlFor="upload-document">
          <div className="icoon" >
            <UploadOne size="30" strokeWidth={3} />
          </div>
          <input type="file" onChange={handleFileChange} id="upload-document" hidden />
        </label>

        <div className="icoon" onClick={() => {
          dispatch(setKeyboard(!kb));
          dispatch(setBrailleBoard(false));
        }} >
          <Keyboard size="30" strokeWidth={3} />
        </div>
        {braille &&
          <div className="icoon" onClick={() => {
            dispatch(setKeyboard(false));
            dispatch(setBrailleBoard(!brailleBoard));
          }} >
            <ViewGridCard size="30" strokeWidth={3} />
          </div>
        }

        {!braille &&
          <>
            {inText &&
              < div className="icoon" onClick={handleSpeech}>
                <VolumeNotice theme="outline" size="30" strokeWidth={3} />
              </div>
            }

            < div className="icoon" onClick={handleStartRecognition} hidden={listening}>
              <Voice theme="outline" size="30" strokeWidth={3} />
            </div>
            < div className="icoon" onClick={handleStartRecognition} hidden={!listening}>
              <PauseOne theme="outline" size="30" strokeWidth={3} />
            </div>
          </>
        }
      </div>
    </div >
  );
}

export default InputTextArea;
