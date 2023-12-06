import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl my-8 text-indigo-600">
        WELCOME TO DEDDIT
      </h1>

      <div className="mb-12">
        <Link href={`/add`}>
          <Button variant="secondary">
            CREATE NEW THREAD <PenSquare size={18} className="ml-2" />
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="font-bold text-2xl mb-4">THREADS</h2>
        {/* {threads.map((thread: ThreadType) => (
          <Link href={`/deddit/${thread.id}`} key={thread.id}>
            <div className="bg-slate-800 rounded-md mb-4 mx-8 border border-slate-400">
              <h1>{thread.title}</h1>
            </div>
          </Link>
        ))} */}
      </div>
    </main>
  );
}
