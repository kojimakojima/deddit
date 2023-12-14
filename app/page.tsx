import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import Link from "next/link";
import prisma from "./utils/db";
import { formatDateTime } from "@/helpers/formatDateTime";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

async function getAllThreads() {
  const data = await prisma.thread.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const threads = await getAllThreads();

  return (
    <main className="text-center pb-6">
      <h1 className="font-bold text-3xl my-4 text-indigo-600">
        WELCOME TO DEDDIT
      </h1>
      {session ? (
        <>
          <div className="mb-12">
            <Link href={`/add`}>
              <Button variant="teal">
                <PenSquare size={18} className="mr-2" /> CREATE NEW THREAD
              </Button>
            </Link>
          </div>

          <div>
            <h2 className="font-bold text-2xl mb-4">THREADS</h2>
            {threads.map((thread) => (
              <Link href={`/thread/${thread.id}`} key={thread.id}>
                <div className="rounded-md mb-4 mx-8 border-4 border-slate-600">
                  <h1 className="text-xl truncate px-8">{thread.title}</h1>
                  <p className="text-xs">
                    Created at {formatDateTime(thread.createdAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold mb-2">
            Please log in to see threads
          </h1>
          <Button asChild>
            <Link href="/auth">Login</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
