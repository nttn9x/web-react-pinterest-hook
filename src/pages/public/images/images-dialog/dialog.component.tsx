import React, { useContext, useMemo } from "react";

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

import { GlobalContext } from "../../../../context/global.context";
import { SHOW_DIALOG, IGlobalContext } from "../../../../context/global.types";

const DialogImages: React.FC = () => {
  const { state, dispatch } = useContext<IGlobalContext>(GlobalContext);
  const index: number = state.get("indexSelected");

  const child = useMemo(() => {
    const url =
      index > -1
        ? state
            .get("datas")
            .get(index)
            .getIn(["images", "fixed_width", "url"])
        : null;

    return (
      <Dialog classes={{ paper: "images-dialog" }} fullScreen open={index > -1}>
        <IconButton
          className="images-dialog_button"
          aria-label="Close"
          onClick={() => dispatch({ type: SHOW_DIALOG, index: -1 })}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <img src={url} alt="" />
      </Dialog>
    );
  }, [index, state, dispatch]);

  return <>{child}</>;
};

export default DialogImages;
