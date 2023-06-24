// @ts-nocheck
import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState, setProfiles, setProfile, setPending } from "app/auth/auth";
import { selectContentState, setPosts } from "app/content/content";
import { fetchAllBlogs, fetchAllProfiles, fetchProfile } from "./blogUtils";
import { profile } from "console";

const GetContent = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const pending = auth.pending;
  const content = useAppSelector(selectContentState);
  const url = auth.BASE_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      dispatch(setPending(true));
      const blogs = await fetchAllBlogs(url, auth?.user?.user_id);
      dispatch(setPosts(blogs));
      const profiles = await fetchAllProfiles(url);
      dispatch(setProfiles(profiles));
      dispatch(setPending(false));
      if (auth.user?.user_id) {
        dispatch(setPending(true));
        const profileData = await fetchProfile(auth.user.user_id, url);
        dispatch(setProfile(profileData));
        dispatch(setPending(false));
      }
    };

    fetchData();
  }, [auth.user_id]);

  return null;
}

export default GetContent;
