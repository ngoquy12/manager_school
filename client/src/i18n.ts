import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../src/locales/en/translate.json";
import translationVI from "../src/locales/vi/translate.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    vi: {
      translation: translationVI,
    },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en", // Ngôn ngữ dự phòng nếu ngôn ngữ được chọn không tồn tại

  interpolation: {
    escapeValue: false, // React đã bảo vệ khỏi XSS
  },
});

export default i18n;
