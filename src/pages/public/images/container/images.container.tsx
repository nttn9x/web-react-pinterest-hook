import React from "react";

import "../styles/images.scss";

import ListComponent from "../images-list/list.component";
import DialogComponent from "../images-dialog/dialog.component";

const Images: React.FC = () => {
  return (
    <div id="m-images" className="images">
      <ListComponent />
      <DialogComponent />
    </div>
  );
};

export default Images;
