// /api/notes return all the notes
import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event);
    const token = cookies.NoteJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: t("statusMessage_no_auth_access"),
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const notes = await prisma.note.findMany({
      where: {
        userId: decodedToken.id,
      },
    });

    return notes;
  } catch (err) {
    console.log(err);
  }
});
