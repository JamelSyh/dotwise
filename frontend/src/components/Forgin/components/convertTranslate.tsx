// @ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectTranscriptorState } from "app/transcriptor/transcriptor";
import { selectAuthState } from "app/auth/auth";
import { setInText, setOutText, setPending, setInOpt, setOutOpt, setInLang, setOutLang, selectTranslatorState } from "app/translator/translator";


function ConvertTranslate() {

  const dispatch = useAppDispatch();
  const transcriptor = useAppSelector(selectTranscriptorState);
  const translator = useAppSelector(selectTranslatorState);
  const auth = useAppSelector(selectAuthState);

  const inText = transcriptor.inText;
  const outText = translator.outText;
  const outTrans = translator.outLang;
  const inTrans = translator.inLang;
  const outTransOpt = translator.outOpt;
  const inLang = transcriptor.inLang;
  const pending = translator.pending;

  const url = auth.BASE_API_URL;
  const dotwise_api_key = auth.DOTWISE_API_KEY;

  const [debouncedText, setDebouncedText] = useState(inText);

  useEffect(() => {

    dispatch(setPending(true));
    const timer = setTimeout(() => {
      setDebouncedText(inText);
    }, 500);
    return () => { clearTimeout(timer); };
  }, [inText, inTrans, dispatch]);


  useEffect(() => {
    const getOptions = async () => {
      try {
        const { data } = await axios.get(`${url}/api/translate_options/`, {
          params: {
            key: dotwise_api_key,
          }
        });
        if (data) {
          dispatch(setInOpt(data));
          dispatch(setOutOpt(data));
          dispatch(setInLang(data[0]));
          dispatch(setOutLang(data[1]));

          if (inLang.code !== "1" && inLang.code !== "2") {
            dispatch(setInText(outText));
          } else {
            dispatch(setInText(inText));
          }
        }
      } catch (error) {
        console.log("error at fteching options: ", error);
      }
    };
    getOptions();
  }, [dispatch]);


  useEffect(() => {
    const Transcoding = async () => {
      try {
        const formData = new FormData();
        formData.append('text', debouncedText);
        formData.append('source_lang', inTrans[0].code);
        formData.append('source_grade', inTrans[0].grade.code);
        formData.append('target_lang', outTrans[0].code);
        formData.append('target_grade', outTrans[0].grade.code);
        formData.append('key', dotwise_api_key);

        const { data } = await axios.post(`${url}/api/translator/`, formData);
        if (data) {
          if (debouncedText !== "" && data.result) {
            dispatch(setOutText(data.result));
          }
          else
            dispatch(setOutText(""));
        }
        if (debouncedText === "")
          dispatch(setOutText(""));

        dispatch(setPending(false));
      } catch (error) {
        console.log("Error at translating:", error);
      }
    };
    Transcoding();
  }, [debouncedText, inText, inTrans, outTrans, dispatch]);

  return (<></>);
}

export default ConvertTranslate;
