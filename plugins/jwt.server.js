// 讓 client 端可以使用 server 端的套件方法

import jwt from "jsonwebtoken";

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      verifyJwtToken: (token, secret, options) => {
        return jwt.verify(token, secret, options);
      },
    },
  };
});
