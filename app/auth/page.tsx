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
import LogInForm from "../components/LogInForm";

export default async function AuthRouter() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex justify-center">
      <Card className="mx-10">
        <CardHeader>
          <CardTitle className="text-center">Please sign in</CardTitle>
          <CardDescription>
            You have to be authenticated to access the private page. Use the
            default email to log in as a guest.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <LogInForm />
            <SigninForm />
            <SignInWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
