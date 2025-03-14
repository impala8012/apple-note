import en from "./locales/en.js";
import zh_tw from "./locales/zh.js";

export const i18nDefined = {
  en: en,
  zh: zh_tw,
};

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  //語言列表
  locales: [
    {
      code: "en", // 語系代碼
      iso: "en-US",
      file: "en.js",
    },
    {
      code: "zh", // 語系代碼
      iso: "zh",
      file: "zh.js",
    },
  ],
  defaultLocale: "en",
  messages: i18nDefined,
}));
