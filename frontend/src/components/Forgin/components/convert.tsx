import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setInLang, setOutText, setPending, setInOpt, setOutOpt, selectTranscriptorState } from "app/transcriptor/transcriptor";
import { selectAuthState } from "app/auth/auth";

function Convert() {

  const dispatch = useAppDispatch();
  const transcriptor = useAppSelector(selectTranscriptorState);
  const auth = useAppSelector(selectAuthState);

  const inText = transcriptor.inText;
  const inLang = transcriptor.inLang;
  const outLang = transcriptor.outLang;
  const inOpt = transcriptor.inOpt;
  const outOpt = transcriptor.outOpt;
  const url = auth.BASE_API_URL;
  const dotwise_api_key = auth.DOTWISE_API_KEY;
  const detectlang_api_key = auth.LANG_DETECT_API_KEY;

  const [debouncedText, setDebouncedText] = useState(inText);

  useEffect(() => {

    dispatch(setPending(true));
    const timer = setTimeout(() => {
      setDebouncedText(inText);
    }, 500);
    return () => { clearTimeout(timer); };
  }, [inText, inLang, dispatch]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const { data } = await axios.get(`${url}/api/transcript_options/`, {
          params: {
            key: dotwise_api_key,
          },
        });
        if (data) {
          dispatch(setInOpt(data));
          dispatch(setOutOpt(data[0]['grade']));
        }
      } catch (error) {
        console.error('Error fetching options:', error);

      }
    };

    getOptions();
  }, [dispatch]);

  useEffect(() => {

    const doDetection = async () => {
      try {
        if (inLang.code === "auto" && debouncedText !== "") {
          const response = await axios.post(
            'https://ws.detectlanguage.com/0.2/detect',
            { q: debouncedText },
            {
              headers: {
                Authorization: `Bearer ${detectlang_api_key}`,
              },
            }
          );

          if (response)
            inOpt.forEach((option) => {
              if (option.code === response.data.data.detections[0].language) {
                dispatch(setInLang(option));
              }
            });
        }
      } catch (error) {
        dispatch(setInLang(inOpt[2]));
      }
    };
    doDetection();
  }, [debouncedText, inLang, inOpt, dispatch]);

  useEffect(() => {

    const Transcoding = async () => {
      try {
        const formData = new FormData();
        formData.append('text', debouncedText);
        formData.append('source', inLang.code);
        formData.append('target', outLang.code);
        formData.append('key', dotwise_api_key);

        const { data } = await axios.post(`${url}/api/transcriptor/`, formData);
        if (data) {
          if (debouncedText !== "" && data.result)
            dispatch(setOutText(data.result));
          else
            dispatch(setOutText(""));
        }
      } catch (error) {
        console.error('Error transcribing:', error);
      }
      dispatch(setPending(false));
    };
    Transcoding();
  }, [debouncedText, inLang, outLang, dispatch]);
  return (<></>);
}

export default Convert;
