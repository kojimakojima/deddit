import React from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Cat } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center p-2 gap-2">
      <Link href={"/"}>
        <Cat size={32} />
      </Link>
      <ModeToggle />
    </div>
  );
}
