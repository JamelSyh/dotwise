import React from "react";
import { Link } from "react-router-dom";
import logoImg from "images/logo.png";
import logoLightImg from "images/logo-light.png";
import LogoSvg from "./LogoSvg";
import MyLogo from "./logo.svg";
import { useHistory } from "react-router-dom";

export interface LogoProps {
  img?: string;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  // img = logoImg,
  // imgLight = logoLightImg,
}) => {
  const history = useHistory();
  return (
    <a onClick={() => { history.push("/"); }} className=" cursor-pointer ttnc-logo inline-block text-primary-6000">
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
      <LogoSvg />
    </a>
  );
};

export default Logo;
