"use client";

import Editor from "./Editor";
import parse from "html-react-parser";
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
  comments: any;
  createdAt: Date;
  updatedAt: Date;
};

type JwtPayload = {
  id: string;
  name: string;
};

type BlogPageProps = {
  data: BlogDataProps;
  decodedToken: any;
};

const BlogPage = ({ data, decodedToken }: BlogPageProps) => {
  const createdDateToString = data.updatedAt;
  const createdDate = new Date(createdDateToString);

  const createdYear = createdDate.getFullYear();
  const createdMonth = (createdDate.getMonth() + 1).toString().padStart(2, "0");
  const createdMonthName = createdDate.toLocaleDateString("default", {
    month: "short",
  });
  const createdDay = createdDate.getDate().toString().padEnd(1, "0");

  const { comments } = data;
  return (
    <div>
      {decodedToken.id == data.authorId ? (
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
            <div className="hover:cursor-pointer flex justify-center items-center gap-x-1 text-base md:text-xl">
              <ThumbsUp size={20} />
              {data.likes}
            </div>
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
