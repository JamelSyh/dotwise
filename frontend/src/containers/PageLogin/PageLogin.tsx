// @ts-nocheck
import LayoutPage from "components/LayoutPage/LayoutPage";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState, setUser, setToken, setProfile, setErrMsg, setPending } from "app/auth/auth";
import { selectContentState, setNotif } from "app/content/content";
import { login } from "../../components/Forgin/components/blogUtils";
import jwt_decode from "jwt-decode";

import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import NotifPopup from "components/notifPopup/NotifPopup";

export interface PageLoginProps {
  className?: string;
}


const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {

  const history = useHistory();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const content = useAppSelector(selectContentState);
  const errMsg = auth.errMsg;

  const token = auth.token;
  const pending = auth.pending;
  const url = auth.BASE_API_URL;

  useEffect(() => {
    dispatch(setErrMsg(null));
  }, [])


  let userLogin = async (username: any, password: any) => {

    let { from } = location.state || { from: { pathname: "/" } };

    dispatch(setPending(true));

    const response = await login(url, username, password);

    const data = await response.json();

    if (response.status === 200) {
      dispatch(setToken(data));
      dispatch(setUser(jwt_decode(data.access)));
      localStorage.setItem("authToken", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(jwt_decode(data.access)));
      dispatch(setNotif({ state: true, msg: "Loggin Successfully", type: "success" }));
      history.replace(from);
    } else {
      dispatch(setErrMsg(data.detail));
    }

    dispatch(setPending(false));
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    userLogin(username, password);
  };

  const updateToken = async () => {
    let response = await fetch(`${url}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: token?.refresh }),
    });
    let data = await response.json();

    if (response.status === 200) {
      dispatch(setToken(data));
      dispatch(setUser(jwt_decode(data.access)));
      localStorage.setItem("authToken", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(jwt_decode(data.access)));
    } else {
      userLogout();
    }
    if (pending) {
      setPending(false);
    }
  };

  let userLogout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (pending) {
      updateToken();
    }
    let interval = setInterval(() => {
      if (token) {
        updateToken();
      }
    }, 1000 * 60 * 4);

    return () => clearInterval(interval);
  }, [token, pending]);


  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Dotwise</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🔑"
        heading="Login"
      >
        <div className="max-w-md mx-auto space-y-6">
          {errMsg && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{errMsg}</span> Change a few things up and try submitting again.
          </div>}
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Username
              </span>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <NcLink to="/forgot-pass" className="text-sm">
                  Forgot password?
                </NcLink>
              </span>
              <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} className="mt-1" />
            </label>
            <ButtonPrimary loading={pending} type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <NcLink to="/signup">Create an account</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
