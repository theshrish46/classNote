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
  const token = cookies().get("accessToken");
  const post = await db.post.findMany();
  if (!token) {
    redirect("/auth");
  }

  return (
    <div>
      <MaxWidthWrapper>
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
