"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SigninForm() {
  const [email, setEmail] = useState<null | string>(null);

  async function SignInWithEmail() {
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (signInResult?.ok) {
      toast.success("Check your email!");
      return;
    }

    toast.error("Something went wrong");
    return;
  }

  return (
    <form action={SignInWithEmail} className="flex-col justify-center hidden">
      <div className="flex flex-col gap-y-2">
        <Label>Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="something@example.com"
        />
      </div>
      <Button type="submit" className="mt-4">
        Sign in with Email
      </Button>
    </form>
  );
}
