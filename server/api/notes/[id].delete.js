import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = await getRouterParam(event, "id");

    const cookies = parseCookies(event);
    const token = cookies.NoteJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: $t("statusMessage_no_auth"),
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const noteTryingToDelete = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!noteTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: $t("statusMessage_no_exit"),
      });
    }

    if (noteTryingToDelete.userId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: $t("statusMessage_no_permission"),
      });
    }

    await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    console.log(err);
  }
});
