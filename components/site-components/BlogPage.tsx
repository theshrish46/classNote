"use client";

import { Comment, Post } from "@prisma/client";
import Editor from "./Editor";
import parse from "html-react-parser";
import { Eye, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import React, { useCallback, useEffect, useState } from "react";
import { handleLike } from "@/actions/like-actions/handlelike";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { viewsAction } from "@/actions/view-actions/view-action";
import { deleteComment } from "@/actions/comment-actions/comment";

type BlogPageProps = {
  data: Post;
  comments?: Array<Comment>;
  user: any;
};

const BlogPage = ({ data, comments, user }: BlogPageProps) => {
  const [liked, setLiked] = useState(data.likedBy.includes(user.id));

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

  if (!comments) {
    return null;
  }

  localStorage.setItem("hasViewed", "false");
  const hasViewedLocalStorage = localStorage.getItem("hasViewed");
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    if (!viewed && hasViewedLocalStorage == "false") {
      viewsAction("true", data.id)
        .then((data) => {
          if (data.success) {
            console.log(data.success);
          }
          if (data.error) {
            console.log(data.error);
          }
          setViewed(true);
          localStorage.setItem("hasViewed", "true");
        })
        .catch((error) => {
          console.log("Inside the catch block of view actions", error);
        });
    }
  }, [viewed, hasViewedLocalStorage]);

  const onLikeHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

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

  const deleteCommentHandler = async (
    id: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    deleteComment(id)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.log("Inside the delete comment handler catch block", error);
      });
  };

  function capitalizeWords(inputString: string) {
    return inputString.replace(/\b\w/g, (match) => match.toUpperCase());
  }

  return (
    <div>
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
              {capitalizeWords(data.authorName)}
            </p>
            <p className="text-sm lg:text-lg text-muted-foreground font-bold">
              Published On :{" "}
              {createdMonthName + " " + createdDay + "," + createdYear + ""}
            </p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-5">
            <Button
              onClick={(e) => onLikeHandler(e)}
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

            <div className="hover:cursor-pointer flex justify-center items-center gap-x-1 text-base md:text-xl">
              <Eye size={20} />
              {data.views}
            </div>
          </div>

          <div className="text-base md:text-lg dark:text-white">
            {parse(data.content)}
          </div>
          <div className="w-full bg-primary-foreground rounded-lg p-2">
            {comments &&
              comments.map((item: any) => (
                <div
                  className="my-2 py-2 px-2 w-full border-b-[1px] border-gray-300 flex justify-between items-center"
                  key={item.id}
                >
                  <div>
                    <div className="text-sm font-semibold">
                      {capitalizeWords(item.userName)}
                    </div>
                    <div>{item.comment}</div>
                  </div>
                  <div>
                    <Button
                      onClick={(e) => deleteCommentHandler(item.id, e)}
                      type="submit"
                      variant={"ghost"}
                      size={"sm"}
                      className="p-1"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default BlogPage;
