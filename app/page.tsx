import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const post = await db.post.findMany();
  console.log(post);
  return (
    <div>
      <MaxWidthWrapper>
        {post.length > 0 ? (
          post.map((item, index) => <div key={index}>{item}</div>)
        ) : (
          <div>no posts</div>
        )}
      </MaxWidthWrapper>
    </div>
  );
}
