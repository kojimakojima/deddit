import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import ProfileForm from "../components/ProfileForm";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const userName = session?.user?.name as string;
  const email = session?.user?.email as string;

  return (
    <div className="flex justify-center">
      <ProfileForm userName={userName} email={email} />
    </div>
  );
}
