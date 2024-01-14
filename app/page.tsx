import { auth } from "@/auth";
import BlogCard from "@/components/site-components/BlogCard";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const sesstion = await auth();
  const post = await db.post.findMany();
  return (
    <div>
      <MaxWidthWrapper>
        {JSON.stringify(sesstion)}
        {post.length > 0 ? (
          post.map((item, index) => (
            <div key={index}>
              <BlogCard data={item} key={item.id} />
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
    </div>
  );
}
