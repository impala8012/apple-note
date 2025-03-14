// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      // google font
      link: [
        {
          rel: "preconnect",
          href: 'https://fonts.googleapis.com"',
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap",
        },
      ],
    },
  },

  devtools: { enabled: false },
  css: ["~/assets/main.css"],
  // vite: {
  //   ssr: {
  //     external: ["@prisma/client"],
  //   },
  //   resolve: {
  //     alias: {
  //       ".prisma/client/index-browser":
  //         "./node_modules/.prisma/client/index-browser.js",
  //     },
  //   },
  // },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@prisma/nuxt",
    "@vueuse/nuxt",
    "nuxt-tiptap-editor",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxtjs/supabase",
  ],
  compatibilityDate: "2025-03-07",
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  prisma: {
    autoSetupPrisma: true,
  },
  // i18 設定
  i18n: {
    vueI18n: "./i18n.config.ts",
    defaultLocale: "zh",
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
  typescript: {
    typeCheck: true,
  },
});
