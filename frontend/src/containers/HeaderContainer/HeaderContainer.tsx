import Header, { HeaderProps } from "components/Header/Header";
import React, { FC, useEffect } from "react";
import { selectCurrentPageData } from "app/pages/pages";
import { useLocation } from "react-router-dom";
import { LocationStates } from "routers/types";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState, setUser, setToken, setErrMsg, setPending } from "app/auth/auth";

export interface HeaderContainerProps {
  className?: string;
}

const HeaderContainer: FC<HeaderContainerProps> = ({ className = "" }) => {
  const currentPage = useAppSelector(selectCurrentPageData);
  let location = useLocation();

  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);

  const user = auth.user;
  const token = auth.token;
  const pending = auth.pending;
  const BASE_API_URL = auth.BASE_API_URL;

  const getMainNavStyle = (): HeaderProps["mainNavStyle"] => {
    // if (location.pathname === "/home-header-style2") {
    //   return "style2";
    // }
    if (user) {
      return "style2Logedin";
    }
    return "style1";
  };

  console.log(getMainNavStyle());

  return <Header mainNavStyle={getMainNavStyle()} currentPage={currentPage} />;
};

export default HeaderContainer;
