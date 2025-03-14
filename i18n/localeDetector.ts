import { defineI18nLocaleDetector } from "#i18n";
import { H3Event } from "h3";
import { I18nLocaleDetectorConfig } from "nuxt-i18n";

// for server side translation
// Detect based on query, cookie, header
export default defineI18nLocaleDetector(
  (event: H3Event, config: I18nLocaleDetectorConfig): string => {
    // try to get locale from query
    const query: string | null = tryQueryLocale(event, { lang: "" }); // disable locale default value with `lang` option
    if (query) {
      return query;
    }

    // try to get locale from cookie
    const cookie: string | null = tryCookieLocale(event, {
      lang: "",
      name: "i18n_locale",
    }); // disable locale default value with `lang` option
    if (cookie) {
      return cookie;
    }

    // try to get locale from header (`accept-header`)
    const header: string | null = tryHeaderLocale(event, { lang: "" }); // disable locale default value with `lang` option
    if (header) {
      return header;
    }

    // If the locale cannot be resolved up to this point, it is resolved with the value `defaultLocale` of the locale config passed to the function
    return config.defaultLocale;
  }
);
