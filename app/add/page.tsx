import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import AddForm from "../components/AddForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";

export default async function AddThread() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  return (
    <div className="text-center">
      <Button
        asChild
        size="sm"
        variant="outline"
        className="absolute bottom-40 left-5"
      >
        <Link href="/">
          <ArrowBigLeft />
        </Link>
      </Button>

      <h1 className="font-bold  text-3xl my-8 text-teal-600">
        CREATE NEW THREAD
      </h1>

      <AddForm />
    </div>
  );
}
