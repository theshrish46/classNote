import BlogCard from "@/components/site-components/BlogCard";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactHTMLParser from "react-html-parser";

export default async function Home() {
  const post = await db.post.findMany();
  return (
    <>
      <MaxWidthWrapper>
        {post.length > 0 ? (
          post.map((item, index) => (
            <div>
              <BlogCard data={item} key={index} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Link
              href={"/write"}
              className={cn(buttonVariants({ variant: "link" }), "text-xl")}
            >
              No Posts write one
              <ArrowRight />
            </Link>
          </div>
        )}
      </MaxWidthWrapper>
    </>
  );
}
