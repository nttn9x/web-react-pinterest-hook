import React, { useState, useContext, ChangeEvent } from "react";

import { useTranslation } from "react-i18next";

import ModalComponent from "../modal/modal.component";

import { GlobalContext } from "../../context/global.context";
import { IGlobalContext } from "../../context/global.types";
import { fetchData } from "../../pages/public/images/images-list/list.hook";

let timeOutId: any = 0;

const Input: React.FC = () => {
  const { dispatch } = useContext<IGlobalContext>(GlobalContext);
  const { t } = useTranslation(["common"]);
  const [isFocus, setFocus] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>("");

  function onFocus() {
    setFocus(true);
  }

  function onBlur() {
    setFocus(false);
  }

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeOutId);

    setTextValue(e.target.value);

    timeOutId = await setTimeout(() => {
      return fetchData(textValue, dispatch, 0);
    }, 300);
  }

  return (
    <>
      <div className="search">
        <input
          value={textValue}
          placeholder={t("search")}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
      {isFocus && (
        <ModalComponent>
          <div className="lock" />
        </ModalComponent>
      )}
    </>
  );
};

export default Input;
