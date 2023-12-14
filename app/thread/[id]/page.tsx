import { Button } from "@/components/ui/button";
import { MessagesSquare, Pencil, UserRound } from "lucide-react";
import prisma from "@/app/utils/db";
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
import CommentForm from "@/app/components/CommentForm";
import { formatDateTime } from "@/helpers/formatDateTime";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/utils/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function getThread(id: string) {
  const data = await prisma.thread.findUnique({
    where: {
      id: id,
    },
  });

  return data;
}

async function getComments(id: string) {
  const data = await prisma.comment.findMany({
    where: {
      threadId: id,
    },
  });

  return data;
}

export default async function Thread({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name as string;
  const userId = session?.user?.id as string;
  if (!session) {
    return redirect("/");
  }

  const thread = await getThread(params.id);
  const comments = await getComments(params.id);

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
              <span className="font-bold mr-2">@{thread.userName}</span>
              Created on
              <span className="font-bold ml-2">
                {formatDate(thread.createdAt)}
              </span>
            </p>
          </div>
          <p className="p-2 border text-lg break-words text-slate-300">
            {displayedDesc}
          </p>
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
            <h2 className="flex mb-8 text-2xl gap-4">
              <MessagesSquare /> {comments.length} Comments
            </h2>

            <div className="mb-8">
              {comments.length === 0 ? (
                <h2 className="text-slate-500 text-center">No comments yet</h2>
              ) : (
                comments.map((comment) => (
                  <div className="mb-4 flex mr-10" key={comment.id}>
                    <Avatar>
                      <AvatarImage src={""} />
                      <AvatarFallback>
                        {comment.userName.substring(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-full ml-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm">@{comment.userName}</p>
                        <p className="text-sm text-slate-600">
                          {formatDateTime(new Date(comment.createdAt))}
                        </p>
                      </div>

                      <p className="text-lg break-words">{comment.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <CommentForm id={params.id} userName={userName} userId={userId} />
        </div>
      </div>
    );
  } else {
    <div>
      <h1>ERROR</h1>
    </div>;
  }
}
