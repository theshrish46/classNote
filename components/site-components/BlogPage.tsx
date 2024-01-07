"use client";

import Editor from "./Editor";
import parse from "html-react-parser";
import { JwtPayload } from "jsonwebtoken";
import { Eye, ThumbsUp } from "lucide-react";
import { redirect } from "next/navigation";
export type BlogDataProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  authorName: string;
  authorId: string;
  likes: number;
  views: number;
  likedBy: string[];
  createdAt: Date;
  updatedAt: Date;
};

type BlogPageProps = {
  data: BlogDataProps;
  token: string | JwtPayload;
};

const BlogPage = ({ data, token }: BlogPageProps) => {
  const createdDateToString = data.updatedAt;
  const createdDate = new Date(createdDateToString);

  const createdYear = createdDate.getFullYear();
  const createdMonth = (createdDate.getMonth() + 1).toString().padStart(2, "0");
  const createdMonthName = createdDate.toLocaleDateString("default", {
    month: "short",
  });
  const createdDay = createdDate.getDate().toString().padEnd(1, "0");
  if (!token) {
    redirect("/auth");
  }

  return (
    <div>
      {token.id == data.authorId ? (
        <div>
          <Editor data={data} key={data.id} />
        </div>
      ) : (
        <div className="my-12 flex flex-col gap-y-5 justify-center items-start">
          <h1 className="text-5xl">{data.title}</h1>
          <p className="text-lg text-muted-foreground">{data.description}</p>

          <div className="w-full flex justify-center items-center gap-x-3">
            <p className="text-lg italic font-bold">{data.authorName}</p>
            <p className="text-base text-muted-foreground font-bold">
              Published On :{" "}
              {createdMonthName + " " + createdDay + "," + createdYear + ""}
            </p>
          </div>
          <div className="w-full flex justify-center items-center gap-x-5">
            <div className="hover:cursor-pointer flex justify-center items-center gap-x-1 text-xl">
              <ThumbsUp size={22} />
              {data.likes}
            </div>
            <div className="hover:cursor-pointer flex justify-center items-center gap-x-1 text-xl">
              <Eye size={22} />
              {data.views}
            </div>
          </div>

          <div className="text-lg dark:text-white">{parse(data.content)}</div>
        </div>
      )}
    </div>
  );
};
export default BlogPage;
