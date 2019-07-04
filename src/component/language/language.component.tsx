import React, { useState } from "react";

import EnglishIco from "../../styles/icons/flag/united-states.png";
import VietNamIco from "../../styles/icons/flag/vietnam.png";

import { useTranslation } from "react-i18next";

const Language: React.FC = () => {
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();

  function changeLanguage(lang: string): void {
    setLanguage(lang);

    i18n.changeLanguage(lang);
  }

  return (
    <div className="language">
      <img
        onClick={() => changeLanguage("en")}
        className={language === "en" ? "language_img--selected" : ""}
        src={EnglishIco}
        alt="ENG"
        title="English"
      />
      <img
        onClick={() => changeLanguage("vi")}
        className={language === "vi" ? "language_img--selected" : ""}
        src={VietNamIco}
        alt="VIE"
        title="Vietnames"
      />
    </div>
  );
};

export default Language;
