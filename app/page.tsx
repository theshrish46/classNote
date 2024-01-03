import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ArrowBigLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const post = await db.post.findMany();
  console.log(post);
  return (
    <div>
      <MaxWidthWrapper>
        {post.length > 0 ? (
          post.map((item, index) => <div></div>)
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
