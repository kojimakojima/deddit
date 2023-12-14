"use client";

import toast from "react-hot-toast";
import { createThread } from "../actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddForm({ userName }: { userName: string }) {
  const router = useRouter();
  return (
    <form
      className="mx-8"
      action={async (formData: FormData) => {
        toast.loading("Creating");
        const result = await createThread(formData);
        toast.dismiss();
        if (result === "empty") {
          toast.error("Fill out completely");
        } else if (result === "success") {
          toast.success("Created Successfully");
          router.push("/");
        } else if (result === "error") {
          toast.error("Failed to create a thread");
        }
      }}
    >
      <Input
        className="mb-2"
        type="text"
        name="userName"
        placeholder="Your name"
        value={userName}
        disabled={true}
      />
      <Input className="mb-2" type="text" name="title" placeholder="Title" />
      <Textarea className="mb-2" name="description" placeholder="Description" />
      <Button variant="outline">
        <PenSquare className="mr-2 h-4 w-4" /> Create
      </Button>
    </form>
  );
}
