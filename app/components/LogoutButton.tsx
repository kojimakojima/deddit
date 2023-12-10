"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
      variant="secondary"
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}/auth`,
        })
      }
    >
      Log out
    </Button>
  );
}
