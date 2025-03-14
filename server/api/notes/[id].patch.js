import jwt from "jsonwebtoken";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
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

    const noteTryingToUpdate = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!noteTryingToUpdate) {
      throw createError({
        statusCode: 401,
        statusMessage: $t("statusMessage_no_exit"),
      });
    }

    if (noteTryingToUpdate.userId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: $t("statusMessage_no_permission"),
      });
    }

    await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        text: body.updatedNote,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
