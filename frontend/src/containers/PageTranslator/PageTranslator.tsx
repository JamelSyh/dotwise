import TransInputTextArea from 'components/Forgin/components/transInputTextArea';
import TransOutputTextArea from 'components/Forgin/components/transOutputTextArea';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setInText, setOutText, switchLang, switchOpt, switchText, selectTranslatorState } from "app/translator/translator";
import ConvertTranslate from './../../components/Forgin/components/convertTranslate';
import VKeyboard from 'components/Forgin/components/keyboard';
import BrailleBoard from 'components/Forgin/components/brailleBoard';


function Translator() {

  const dispatch = useAppDispatch();
  const translator = useAppSelector(selectTranslatorState);

  const kb = translator.keyboard;
  const brailleBoard = translator.brailleBoard;
  const inTrans = translator.inLang;

  const swap = () => {
    dispatch(switchOpt());
    dispatch(switchLang());
    dispatch(switchText());
  }


  return (
    <>
      <ConvertTranslate />
      <main>
        <div>
          <div className="container">
            <div className="input-container">
              <TransInputTextArea />
              <div className="center">
                <div className="swap-position" onClick={swap}>
                  <i className="fa-solid fa-arrow-right-arrow-left"></i>
                </div>
              </div>
              <TransOutputTextArea />
            </div>
          </div>
        </div>
        {brailleBoard && <BrailleBoard />}
        {kb && <VKeyboard grade inLang={inTrans} />}
      </main>
    </>
  );
}

export default Translator;
