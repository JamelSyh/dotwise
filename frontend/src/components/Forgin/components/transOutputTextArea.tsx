import { useAppDispatch, useAppSelector } from "app/hooks";
import { setOutText, selectTranslatorState } from "app/translator/translator";
import { selectTranscriptorState } from "app/transcriptor/transcriptor";
import { selectAuthState } from "app/auth/auth";
import TransDropdown from "./transDropdown";
import TransDropdownGrade from "./transDropdownGrade";
import { DownloadOne, Copy, Printer } from "@icon-park/react";
import '../App.css';

function TransOutputTextArea() {

  const dispatch = useAppDispatch();
  const translator = useAppSelector(selectTranslatorState);
  const transcriptor = useAppSelector(selectTranscriptorState);
  const auth = useAppSelector(selectAuthState);

  const outText = translator.outText;
  const outTrans = translator.outLang;
  const outTransOpt = translator.outOpt;
  const inLang = transcriptor.inLang;
  const pending = translator.pending;
  const url = auth.BASE_API_URL;
  const dotwise_api_key = auth.DOTWISE_API_KEY;


  const copyToClipboard = () => {
    navigator.clipboard.writeText(outText);
  }

  const handleDownload = async () => {
    const response = await fetch(`${url}/api/downloadfile/?braille=${outText}&key=${dotwise_api_key}`);
    const blob = await response.blob();
    const tempUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = tempUrl;
    link.download = "braille.brf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(tempUrl);
  };


  const placeholderHandler = () => {
    return pending ? 'translating...' : "translation"
  }

  const handlePrint = async () => {
    const response = await fetch(`${url}/api/downloadfile/?braille=${outText}&key=${dotwise_api_key}`);
    const text = await response.text();
    const printWindow = window.open("", "_blank");
    printWindow?.document.write(`<pre>${text}</pre>`);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="card output-wrapper">
      <div className="to">
        <span className="heading">To :</span>
        <TransDropdown id="out" opt={outTransOpt} lang={outTrans} />
        <TransDropdownGrade id="out" opt={outTrans} lang={outTrans} />
      </ div>
      <textarea id="output-text" cols={30} rows={6} placeholder={placeholderHandler()} disabled value={outText ? outText : ""} onChange={event => dispatch(setOutText(event.target.value))}></textarea>
      {outText &&
        <div className="card-bottom">
          <div className="icoon" onClick={handlePrint} >
            <Printer size="25" strokeWidth={3} />
          </div>
          {(inLang.code !== "1" && inLang.code !== "2") && <div className="icoon" onClick={handleDownload} >
            <DownloadOne size="30" strokeWidth={3} />
          </div>}
          <div className="icoon" onClick={copyToClipboard} >
            <Copy theme="outline" size="25" strokeWidth={3} />
          </div>
        </div>
      }
    </div>
  );
}

export default TransOutputTextArea;

