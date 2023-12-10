import { ModeToggle } from "../../components/mode-toggle";
import Link from "next/link";
import { Cat } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <Cat size={32} />
        </Link>
        <ModeToggle />
      </div>

      {session && (
        <div className="flex items-center gap-2">
          <p>{session?.user?.name}</p>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
