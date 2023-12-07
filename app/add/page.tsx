"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PenSquare } from "lucide-react";
import { createThread } from "../actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddThread() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("Loading...");
    const formData = new FormData(e.currentTarget as HTMLFormElement);
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
  };

  return (
    <div className="text-center">
      <h1 className="font-bold  text-3xl my-8 text-teal-600">
        CREATE NEW THREAD
      </h1>

      <form className="mx-8" onSubmit={handleSubmit}>
        <Input className="mb-2" type="text" name="title" placeholder="Title" />
        <Textarea
          className="mb-2"
          name="description"
          placeholder="Description"
        />
        <Button variant="outline">
          <PenSquare className="mr-2 h-4 w-4" /> Create
        </Button>
      </form>
    </div>
  );
}
