"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInWithGithub() {
  return (
    <Button
      className="mt-6"
      variant="secondary"
      onClick={() =>
        signIn("github", {
          callbackUrl: `${window.location.origin}`,
        })
      }
    >
      Login with Github <Github className="w-4 h-4 ml-4" />
    </Button>
  );
}
