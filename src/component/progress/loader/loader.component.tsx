import React from "react";

import "./loader.scss";

const Circular: React.FC = () => {
  return (
    <div className="spinner">
      <div className="double-bounce1" />
      <div className="double-bounce2" />
    </div>
  );
};

export default Circular;
