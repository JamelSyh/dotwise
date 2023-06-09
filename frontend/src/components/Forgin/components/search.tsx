import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setInOpt, setData, selectSearchState } from "app/search/search";
import { selectAuthState } from "app/auth/auth";


function Search() {

  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearchState);
  const auth = useAppSelector(selectAuthState);



  const lang = search.inLang;
  const url = auth.BASE_API_URL;
  const dotwise_api_key = auth.DOTWISE_API_KEY;



  useEffect(() => {
    const getOptions = async () => {
      try {
        const { data } = await axios.get(`${url}/api/search_options/`, {
          params: {
            key: dotwise_api_key,
          },
        });

        if (data) {
          dispatch(setInOpt(data));
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    getOptions();
  }, [dispatch]);

  useEffect(() => {

    const getSearchData = async () => {
      try {
        const { data } = await axios.get(`${url}/api/contraction_list/`, {
          params: {
            lang: lang.code,
            key: dotwise_api_key,
          }
        });
        if (data) {
          dispatch(setData(data))
          // dispatch(inputOptions(data));
          // dispatch(outputOptions(data[0]['grade']));
        }
      } catch (error) {
        console.error('Error at contraction list :', error);
      }
    };
    getSearchData();
  }, [dispatch, lang]);

  return (<></>);
}

export default Search;

