import Header, { HeaderProps } from "components/Header/Header";
import React, { FC, useEffect } from "react";
import { useAppSelector } from "app/hooks";
import { selectCurrentPageData } from "app/pages/pages";
import { useLocation } from "react-router-dom";
import { LocationStates } from "routers/types";

export interface HeaderContainerProps {
  className?: string;
}

const HeaderContainer: FC<HeaderContainerProps> = ({ className = "" }) => {
  const currentPage = useAppSelector(selectCurrentPageData);
  let location = useLocation();

  const getMainNavStyle = (): HeaderProps["mainNavStyle"] => {
    // if (location.pathname === "/home-header-style2") {
    //   return "style2";
    // }
    if (location.pathname === "/home-header-style2-logedin") {
      return "style2Logedin";
    }
    return "style1";
  };

  console.log(getMainNavStyle());

  return <Header mainNavStyle={getMainNavStyle()} currentPage={currentPage} />;
};

export default HeaderContainer;
