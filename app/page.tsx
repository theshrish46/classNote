import { auth } from "@/auth";
import BlogCard from "@/components/site-components/BlogCard";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { currentServerUser } from "@/hooks/use-server-user";

export default async function Home() {
  const user = await currentServerUser();
  const post = await db.post.findMany();
  return (
    <div>
      <MaxWidthWrapper>
        {post.length > 0 ? (
          post.map((item) => (
            <div key={item.id}>
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
