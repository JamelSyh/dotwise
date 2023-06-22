import React from "react";
import NcLink from "components/NcLink/NcLink";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState, setUser, setToken, setProfile, setErrMsg, setPending } from "app/auth/auth";
import { useHistory } from "react-router-dom";

const DashboardRoot = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const auth = useAppSelector(selectAuthState);

  let userLogout = () => {
    history.push("/");
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setProfile({}));
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <div className="rounded-xl min-h-full text-sm border border-neutral-100 dark:border-neutral-800 p-6 md:text-base">
      <span className="block text-lg mb-3">
        👋 Hello Welcome to your Dashboard <br />
        <strong className={"ml-2"}>{auth.profile.displayName}</strong>, (not <strong>{auth.profile.displayName}</strong>?{" "}
        <a className="nc-NcLink font-medium text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000 cursor-pointer" onClick={userLogout}>Sign out</a>)
      </span>
    </div >
  );
};

export default DashboardRoot;
