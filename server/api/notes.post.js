import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event);
    const token = cookies.NoteJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: $t("statusMessage_no_auth"),
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const newNote = await prisma.note.create({
      data: {
        text: "",
        userId: decodedToken.id,
      },
    });

    return newNote;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: $t("statusMessage_not_verify"),
    });
  }
});
