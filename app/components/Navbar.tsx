import { ModeToggle } from "../../components/mode-toggle";
import Link from "next/link";
import { Cat, UserRoundCog } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import LogoutButton from "./LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback>
                  {session.user?.name?.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
              <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
              <Link href={"/profile"}>
                <DropdownMenuItem>
                  <UserRoundCog className="mr-2" /> Edit Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
