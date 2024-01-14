import { auth } from "@/auth";
import BlogPage, { BlogDataProps } from "@/components/site-components/BlogPage";
import Comment from "@/components/site-components/Comment";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { db } from "@/lib/db";
import { decodedToken } from "@/lib/jwt-token";
import { cookies } from "next/headers";

const Page = async ({ params }: { params: { id: string } }) => {
  const post = await db.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      comments: true,
    },
  });

  // console.log(post);
  const session = await auth();
  return (
    <>
      <MaxWidthWrapper className="container">
        <BlogPage
          data={post as BlogDataProps}
          decodedToken={session?.user}
          key={post?.id}
        />
        {session?.user.id == post?.authorId ? null : (
          <>
            <Comment postId={params.id} decodedToken={session?.user} />
          </>
        )}
      </MaxWidthWrapper>
    </>
  );
};
export default Page;
