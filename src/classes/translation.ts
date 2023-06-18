import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "../locale/enUS.json";
import ptBR from "../locale/ptBR.json";

i18n.use(initReactI18next).init({
  resources: {
    enUS: { translation: enUS },
    ptBR: { translation: ptBR },
  },
  lng: "enUS",
  fallbackLng: "enUS",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
