import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setInText, setOutText, setInOpt, selectTranscriptorState } from "app/transcriptor/transcriptor";
import Dropdown from './dropdown';
import { DownloadOne, Copy } from "@icon-park/react";
import '../App.css';

function OutputTextArea() {


  const dispatch = useAppDispatch();
  const transcriptor = useAppSelector(selectTranscriptorState);
  const inText = transcriptor.inText;
  const outText = transcriptor.outText;
  const inLang = transcriptor.inLang;
  const outLang = transcriptor.outLang;
  const inOpt = transcriptor.inOpt;
  const outOpt = transcriptor.outOpt;
  const pending = transcriptor.pending;

  // const url = useSelector(state => state.backend.url);
  // const dotwise_api_key = useSelector(state => state.backend.dotwiseApiKey);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(outText);
  }

  // const handleDownload = async () => {
  //   const response = await fetch(`${url}downloadfile/?braille=${outText}&key=${dotwise_api_key}`);
  //   const blob = await response.blob();
  //   const tempUrl = window.URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = tempUrl;
  //   link.download = "braille.brf";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   window.URL.revokeObjectURL(tempUrl);
  // };


  // const placeholderHandler = () => {
  //   if (inLang.code === 'ar')
  //     return pending ? 'جار الترجمة...' : 'الترجمة';
  //   else
  //     return pending ? 'translating...' : "translation"
  // }

  // useEffect(() => {
  //   if (outLang.code !== "1" && outLang.code !== "2") {
  //     outOpt.forEach((lang) => {
  //       if (lang === outLang)
  //         dispatch(inputOptions(lang.grade));
  //     });
  //   }
  // }, [outLang])

  return (
    <div className="card output-wrapper">
      <div className="to">
        <span className="heading">To :</span>
        <Dropdown id="out" opt={outOpt} lang={outLang} />
      </ div>
      <textarea id="output-text" dir={inLang.code === 'ar' ? 'rtl' : ''} cols={30} rows={6} /* placeholder={placeholderHandler()} */ disabled value={outText ? outText : ""} onChange={event => dispatch(setOutText(event.target.value))}></textarea>
      {outText &&
        <div className="card-bottom">
          {/* {(inLang.code !== "1" && inLang.code !== "2") && <div className="icoon" onClick={handleDownload} > */}
          {/*   <DownloadOne size="30" strokeWidth={3} /> */}
          {/* </div>} */}
          <div className="icoon" onClick={copyToClipboard} >
            <Copy theme="outline" size="25" strokeWidth={3} />
          </div>
        </div>
      }
    </div>
  );
}

export default OutputTextArea;

