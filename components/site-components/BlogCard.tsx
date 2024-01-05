"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ReactHTMLParser from "react-html-parser";

interface DataProps {
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
}

interface BlogCardProps {
  data: DataProps;
}

const BlogCard = ({ data }: BlogCardProps) => {
  return (
    <Link href={`/blog/${data.id}`} target="_blank">
      <Card className="cursor-pointer my-3 w-10/12 mx-auto h-38">
        <CardHeader>
          <CardTitle className="text-3xl my-1">{data.title}</CardTitle>
          <CardDescription className="text-base">
            {data.description.slice(0, 50)}...{" "}
            <span className="text-indigo-500">read more</span>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center">
          <p className="text-xl">{data.authorName}</p>
          <p className="text-xl">{data.views}</p>
          <p className="text-xl">{data.category}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
