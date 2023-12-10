"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LogInForm() {
  const [email, setEmail] = useState<string>("tester@test.com");

  async function LogInInWithEmail(formData: FormData) {
    try {
      const signInResult = await signIn("credentials", {
        email: email,
        callbackUrl: `${window.location.origin}`,
      });
      if (signInResult?.ok) {
        toast.success("Logged in!");
        return;
      } else {
        // toast.error("Something went wrong");
        return;
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }
  return (
    <>
      <form
        action={LogInInWithEmail}
        className="flex flex-col justify-center mb-8"
      >
        <div className="flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="something@example.com"
            defaultValue={email}
          />
        </div>
        <Button type="submit" className="mt-4">
          Log in with Email
        </Button>
      </form>
      <hr className="mb-8" />
    </>
  );
}
