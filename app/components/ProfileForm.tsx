"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { updateUserName } from "../actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfileForm({
  userName,
  email,
}: {
  userName: string;
  email: string;
}) {
  const router = useRouter();
  return (
    <form
      action={async (formData: FormData) => {
        const result = await updateUserName(formData, email);
        if (result) {
          toast(
            (t) => (
              <span>
                Log out to apply change
                <Button
                  variant="outline"
                  size="sm"
                  className="text-slate-100 ml-3"
                  onClick={() => toast.dismiss(t.id)}
                >
                  X
                </Button>
              </span>
            ),
            {
              duration: 5000,
            }
          );
          router.push("/");
        }
      }}
    >
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Edit your name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Name</Label>
              <Input
                name="userName"
                placeholder="Your name"
                defaultValue={userName}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={"/"}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
