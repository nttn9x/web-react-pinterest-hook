import React from "react";

import LanguageComponent from "../language/language.component";
import SearchComponent from "./layout-header-search.component";

import Logo from "../../styles/icons/pinterestgroup-logo.png";

const Header: React.FC = () => {
  return (
    <header>
      <img src={Logo} alt="" className="logo" />
      <SearchComponent />
      <LanguageComponent />
    </header>
  );
};

export default Header;
