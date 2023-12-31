"use client";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import Editor from "./Editor";
import Comment from "./Comment";
import { Button, buttonVariants } from "./ui/button";
import { Eye, Heart } from "lucide-react";
import axios from "axios";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

type TProps = {
  blogId: any;
  data: any;
};

const BlogCard = ({ data, blogId }: TProps) => {
  const user = useSelector((state) => state.userAuth);
  const userID = user.id;
  const { post, comment } = data;
  const { authorId } = post;
  // const [liked, isLiked] = useState(false);
  const liked = localStorage.getItem("liked");

  async function handleLike(e) {
    if (liked == "true") {
      return;
    }
    e.preventDefault();
    const res = axios.post(`http://localhost:8000/blog/like/${post._id}`, {
      userId: userID,
    });
    // isLiked(true);
    localStorage.setItem("liked", "true");
    console.log(res);
    const { data } = await res;
    console.log("data", data);
  }
  return (
    // TODO: work on the post views and make it persistant
    <>
      <div className="w-full">
        <div className="w-full flex justify-end items-center gap-x-3">
          <div className="hover:cursor-pointer">
            <Button
              variant={"link"}
              onClick={handleLike}
              className="flex justify-center items-center gap-x-1.5"
            >
              <Heart
                size={24}
                className={cn(
                  liked == "true"
                    ? "text-pink-700 font-bold fill-pink-700"
                    : "text-pink-700"
                )}
              />
              <div className={"no-underline"}>{post.likes}</div>
            </Button>
          </div>
          <div className="flex gap-x-2 justify-end items-center">
            <Eye size={20} />
            <div className="font-medium text-gray-900">{post.views}</div>
          </div>
        </div>
      </div>
      {userID == authorId ? (
        <div>
          <Editor data={data.post} />
        </div>
      ) : (
        <div>
          <div className="py-10">
            <div className="flex flex-col justify-center">
              <div className="text-7xl text-muted-foreground font-semibold">
                {post?.title}
              </div>
            </div>

            <div className="my-5 flex justify-between items-stretch gap-y-5">
              <div className="text-2xl tracking-wide leading-9 text-left text-muted-foreground">
                {post?.description}
              </div>
            </div>
            <div className="my-5 flex justify-between items-center">
              <div className="italic text-xl font-bold tracking-wide">
                {post?.author}
              </div>
              <div className="text-lg font-medium italic tracking-wider">
                {post?.category}
              </div>
            </div>
            <div>{ReactHtmlParser(post.content)}</div>
          </div>
          <div className="my-5">
            {comment.map((item, index) => (
              <div
                className="bg-secondary my-4 py-4 flex flex-col gap-y-3"
                key={index}
              >
                <div className="flex gap-x-3 px-3">
                  <div>Author {item.authorId} On the post</div>
                  <div>Post {item.postId}</div>
                </div>
                <div className="px-3 text-lg font-medium text-gray-900">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
          <Comment postId={blogId} />
        </div>
      )}
    </>
  );
};

export default BlogCard;
