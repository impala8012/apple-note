// /api/user POST

import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // 驗證 email
    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: $t("message_invalid_meg"),
      });
    }

    // email 規則
    if (
      !validator.isStrongPassword(body.password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      throw createError({
        statusCode: 400,
        message: $t("message_password_error"),
      });
    }

    // 密碼加鹽
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);

    // 存到 prisma
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        salt: salt,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    setCookie(event, "NoteJWT", token);

    return { data: "success!" };
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: $t("message_exist"),
      });
    }

    throw error;
  }
});
