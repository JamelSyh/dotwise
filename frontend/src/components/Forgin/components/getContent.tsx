// @ts-nocheck
import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState, setProfiles, setProfile } from "app/auth/auth";
import { selectContentState, setPosts } from "app/content/content";
import { fetchAllBlogs, fetchAllProfiles, fetchProfile } from "./blogUtils";
import { profile } from "console";

const GetContent = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const content = useAppSelector(selectContentState);
  const url = auth.BASE_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      const blogs = await fetchAllBlogs(url, auth?.user?.user_id);
      dispatch(setPosts(blogs));
      const profiles = await fetchAllProfiles(url);
      dispatch(setProfiles(profiles));
      if (auth.user?.user_id) {
        const profile = await fetchProfile(auth.user.user_id, url);
        dispatch(setProfile(profile));
      }
    };

    fetchData();
  }, [content]);

  return null;
}

export default GetContent;
