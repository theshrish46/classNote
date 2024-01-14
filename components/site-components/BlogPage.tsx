"use client";

import { Post } from "@prisma/client";
import Editor from "./Editor";
import parse from "html-react-parser";
import { Eye, ThumbsUp } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import React, { useCallback, useEffect, useState } from "react";
import { handleLike } from "@/actions/like-actions/handlelike";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { viewsAction } from "@/actions/view-actions/view-action";
type BlogPageProps = {
  data: Post;
  user: any;
};

const BlogPage = ({ data, user }: BlogPageProps) => {
  const [liked, setLiked] = useState(data.likedBy.includes(user.id));
  const view = localStorage.setItem("viewd", "true");

  console.log("initial like", liked);

  const toggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const createdDateToString = data.updatedAt;
  const createdDate = new Date(createdDateToString);

  const createdYear = createdDate.getFullYear();
  const createdMonthName = createdDate.toLocaleDateString("default", {
    month: "short",
  });
  const createdDay = createdDate.getDate().toString().padEnd(1, "0");

  const { comments }: any = data;
  if (!comments) {
    return null;
  }

  useEffect(() => {
    
  }, []);

  const onSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log("before toggling", liked);

    toggleLike();

    console.log("before sending to the actions and after toggling", liked);
    handleLike(!liked, data.id)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.log("Inside the catch blog of like handling", error);
      });
  };

  return (
    <div>
      <div>{user.id}</div>
      <div>{data.authorId}</div>
      {user.id == data.authorId ? (
        <div>
          <Editor data={data} key={data.id} />
        </div>
      ) : (
        <div className="my-12 flex flex-col gap-y-3 md:gap-y-5 justify-center items-start">
          <h1 className="text-3xl md:text-5xl">{data.title}</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {data.description}
          </p>

          <div className="w-full flex justify-center items-center gap-x-3">
            <p className="text-sm lg:text-lg italic font-bold">
              {data.authorName}
            </p>
            <p className="text-sm lg:text-lg text-muted-foreground font-bold">
              Published On :{" "}
              {createdMonthName + " " + createdDay + "," + createdYear + ""}
            </p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-5">
            <form onSubmit={onSubmit}>
              <Button
                type="submit"
                variant={"ghost"}
                className={cn(
                  liked === true ? "text-pink-700" : "text-pink-300",
                  "hover:cursor-pointer hover:bg-transparent flex justify-center items-center gap-x-1 text-base md:text-xl"
                )}
              >
                <ThumbsUp size={20} />
                {data.likes}
              </Button>
            </form>
            <div className="hover:cursor-pointer flex justify-center items-center gap-x-1 text-base md:text-xl">
              <Eye size={20} />
              {data.views}
            </div>
          </div>

          <div className="text-base md:text-lg dark:text-white">
            {parse(data.content)}
          </div>
          <div className="w-full bg-gray-100">
            {comments &&
              comments.map((item: any) => (
                <div
                  className="my-2 py-2 px-2 w-full border-b-2 border-gray-300"
                  key={item.id}
                >
                  <div className="text-sm font-semibold">{item.userName}</div>
                  <div>{item.comment}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default BlogPage;
