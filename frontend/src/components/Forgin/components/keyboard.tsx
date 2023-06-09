import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setInText, selectTranscriptorState } from "app/transcriptor/transcriptor";
import 'react-simple-keyboard/build/css/index.css';
import SimpleKeyboard from 'react-simple-keyboard';
import layout from '../constants/keyboardLayout';
import "../App.css";
import { selectTranslatorState } from 'app/translator/translator';

// @ts-ignore
const VKeyboard = ({ grade, inLang }) => {

  const [shift, setShift] = useState(false);
  const [caps, setCaps] = useState(false);
  const [brailleMode, setBrailleMode] = useState(false);
  const [layoutName, setLayoutName] = useState("default");

  const dispatch = useAppDispatch();
  const transcriptor = useAppSelector(selectTranscriptorState);
  const translator = useAppSelector(selectTranslatorState);


  const inText = transcriptor.inText;
  const outLang = transcriptor.outLang;
  const inTrans = translator.inLang;
  let normalLayout = "";

  if (grade)
    normalLayout = `${inTrans[0]['grade'].code}_${inTrans[0].code}${(caps || shift) ? '_shift' : ''}`;
  else
    normalLayout = `${inLang?.code}_${outLang.code}${(caps || shift) ? '_shift' : ''}`;


  useEffect(() => {
    setLayoutName(normalLayout);
  }, [normalLayout])

  useEffect(() => {
    if (inLang.code === "1" || inLang.code === "2") {
      setBrailleMode(true);
    }
    else
      setBrailleMode(false);
  }, [inLang]);

  // @ts-ignore
  const onKeyPress = button => {
    switch (button) {
      case "{shift}":
        setShift(!shift);
        return;
      case "{lock}":
        setShift(false);
        setCaps(!caps);
        return;
      case "{bksp}":
        dispatch(setInText(inText.slice(0, -1)));
        return;
      case "{enter}":
        dispatch(setInText(inText + "\n"));
        return;
      case "{space}":
        dispatch(setInText(inText + " "));
        return;
      case "{tab}":
        dispatch(setInText(inText + "\t"));
        return;
      case "@":
        if (brailleMode) {
          if (layoutName === "more") {
            setLayoutName(normalLayout);
            return;
          }
          setLayoutName("more");
        } else {
          dispatch(setInText(inText + "@"));
        }

        return;

      default:
        setShift(false);
        dispatch(setInText(inText + button));
        return;


    }
  };

  return (
    <div id="kcontainer">
      <SimpleKeyboard
        layoutName={layoutName}
        layout={layout}
        onKeyPress={onKeyPress}
        theme="hg-theme-default myTheme "
        mergeDisplay={true}
        display={{
          "{enter}": "enter",
          "{tab}": "tab ⇥",
          "{bksp}": "⌫",
          "{capslock}": "caps lock ⇪",
          "{shift}": "⇧",
          '@': brailleMode ? "more" : "@",
        }}
      />
    </div>
  );
};

export default VKeyboard;
