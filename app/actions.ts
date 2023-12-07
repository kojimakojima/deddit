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

    revalidatePath("/", "page");
    return "success";
  } catch (error) {
    return "error";
  }
}
