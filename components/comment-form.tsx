"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createComment } from "@/app/actions";
import toast from "react-hot-toast";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useRef } from "react";

export default function CommentForm({ id }: { id: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form
      action={async (formData: FormData) => {
        toast.loading("Posting");
        const result = await createComment(formData, id);
        toast.dismiss();
        if (result === "empty") {
          toast.error("Type something to submit");
        } else if (result === "success") {
          toast.success("Posted Successfully");
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        } else if (result === "error") {
          toast.error("Failed to post");
        }
      }}
      className="pb-8 flex"
    >
      <Input
        className="mr-1"
        type="text"
        placeholder="Comment"
        name="comment"
        ref={inputRef}
      />
      <HoverCard>
        <HoverCardTrigger>
          <Button variant="outline">
            <Send className="h-5 w-5" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="text-center text-sm">
          Send
        </HoverCardContent>
      </HoverCard>
    </form>
  );
}
