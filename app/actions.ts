"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function createThread(formData: FormData) {
  "use server";

  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title.trim() || !description.trim()) {
      return "empty";
    }

    await prisma.thread.create({
      data: {
        title: title,
        description: description,
      },
    });

    revalidatePath("/");
    return "success";
  } catch (error) {
    return "error";
  }
}

export async function createComment(formData: FormData, id: string) {
  "use server";

  try {
    const comment = formData.get("comment") as string;
    const threadId = id as string;

    if (!comment.trim()) {
      return "empty";
    }

    await prisma.comment.create({
      data: {
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
