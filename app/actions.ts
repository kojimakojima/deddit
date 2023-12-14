"use server";

import { revalidatePath } from "next/cache";
import prisma from "./utils/db";

export async function createThread(
  formData: FormData,
  userName: string,
  userId: string
) {
  "use server";

  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title.trim() || !description.trim()) {
      return "empty";
    }
    await prisma.thread.create({
      data: {
        userName: userName,
        userId: userId,
        title: title,
        description: description,
      },
    });

    revalidatePath("/");
    return "success";
  } catch (error) {
    console.error(error);
    return "error";
  }
}

export async function deleteThread(id: string) {
  "use server";

  try {
    await prisma.thread.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createComment(formData: FormData, id: string) {
  "use server";

  try {
    const userName = formData.get("userName") as string;
    const userId = formData.get("userId") as string;
    const comment = formData.get("comment") as string;
    const threadId = id as string;

    if (!comment.trim() || !userName.trim()) {
      return "empty";
    }

    await prisma.comment.create({
      data: {
        userName: userName,
        userId: userId,
        comment: comment,
        threadId: threadId,
      },
    });

    revalidatePath(`/thread/${id}`);
    return "success";
  } catch (error) {
    return "error";
  }
}

export async function updateUserName(formData: FormData, email: string) {
  "use server";
  try {
    const userName = formData.get("userName") as string;

    if (!userName.trim()) {
      return;
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: userName,
      },
    });
    revalidatePath(`/`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
