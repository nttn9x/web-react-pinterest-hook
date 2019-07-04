import React from "react";
import PropTypes from "prop-types";

import HeaderComponent from "./layout-header.component";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
