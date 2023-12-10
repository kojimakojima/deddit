import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInWithGithub from "../components/SignInWithGithub";
import { authOptions } from "../utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SigninForm from "../components/SignInForm";

export default async function AuthRouter() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            You have to be authenticated to access the private pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <SigninForm />
            <SignInWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
