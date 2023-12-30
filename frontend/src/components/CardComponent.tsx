// "use client";
import axios from "axios";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import NoPost from "./NoPost";

type TProps = {
  className?: String;
};

const CardComponent = async ({ className }: TProps) => {
  const res = await axios.get("http://localhost:8000/blog/getpost");
  const { data } = await res;
  return (
    <div className={cn(className, "w-full")}>
      {data.length == 0 ? (
        <div>
          <NoPost />
        </div>
      ) : (
        <div>
          {data?.map(
            (
              item: {
                _id: string;
                title: string;
                description: string;
                author: string;
                category: string;
              },
              index: any
            ) => (
              <Link href={`/blog/${item._id}`} key={index}>
                <Card
                  className="flex flex-col min-h-48 justify-between items-stretch hover:cursor-pointer border-2 border-gray-400 my-10"
                  key={index}
                >
                  <CardHeader className="flex gap-y-3 text-justify">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-600">
                      {item.category}
                    </p>
                    <p className="text-sm font-semibold text-gray-600 hover:text-blue-600">
                      {item.author}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CardComponent;
