import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessagesSquare, Pencil, Send } from "lucide-react";
import prisma from "@/app/db";
import { formatDate } from "@/helpers/formatDate";
import { reduceText } from "@/helpers/reduceText";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

async function getThread(id: string) {
  const data = await prisma.thread.findUnique({
    where: {
      id: id,
    },
  });

  return data;
}

export default async function Thread({ params }: { params: { id: string } }) {
  const thread = await getThread(params.id);

  if (thread) {
    const descLength: number = 200;
    const isLongDesc: boolean = thread.description.length > descLength;
    const displayedDesc = isLongDesc
      ? reduceText(thread.description, descLength)
      : thread.description;
    return (
      <div className="m-8">
        <div className="mb-2">
          <h1 className="text-4xl mb-2 break-words">{thread.title}</h1>
          <div className="mb-4 flex flex-wrap">
            <Pencil size={22} className="mr-2" />
            <p>
              Created on
              <span className="font-bold ml-2">
                {formatDate(thread.createdAt)}
              </span>
            </p>
          </div>
          <p className="text-lg break-words text-slate-300">{displayedDesc}</p>
        </div>
        {isLongDesc && (
          <div className="flex justify-center mb-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="teal" size="sm">
                  Show More
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>{thread.title}</SheetTitle>
                  <SheetDescription>{thread.description}</SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        )}

        <div>
          <div className="mb-4">
            <h2 className="flex">
              <MessagesSquare /> Comments
            </h2>

            <div>{/* comments hhere */}</div>
          </div>

          <form>
            <Input className="mb-2" type="text" placeholder="Comment" />
            <Button variant="outline">
              <Send className="mr-2 h-4 w-4" /> POST
            </Button>
          </form>
        </div>
      </div>
    );
  } else {
    <div>
      <h1>ERROR</h1>
    </div>;
  }
}
