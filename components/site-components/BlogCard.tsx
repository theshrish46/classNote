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
    <Link href={`/blog/${data.id}`} key={data.id}>
      <Card className="cursor-pointer my-3 w-full mx-auto h-38">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl my-1">
            {data.title}
          </CardTitle>
          <CardDescription className="text-base">
            {data.description.slice(0, 50)}...{" "}
            <span className="text-gray-500">read more</span>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm lg:text-base">{data.authorName}</p>
          <p className="text-sm lg:text-base">{data.views}</p>
          <p className="text-sm lg:text-base">{data.category}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
