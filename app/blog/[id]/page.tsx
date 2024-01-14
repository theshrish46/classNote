"use server";
import BlogPage from "@/components/site-components/BlogPage";
import Comment from "@/components/site-components/Comment";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { db } from "@/lib/db";
import { currentServerUser } from "@/hooks/use-server-user";

const Page = async ({ params }: { params: { id: string } }) => {
  const post = await db.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      comments: true,
    },
  });
  if (!post) {
    return { error: "No Posts available" };
  }

  const user = await currentServerUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  return (
    <>
      <MaxWidthWrapper className="container">
        <BlogPage data={post} user={user} key={post?.id} />
        {user.id == post?.authorId ? null : (
          <>
            <Comment postId={params.id} decodedToken={user} />
          </>
        )}
      </MaxWidthWrapper>
    </>
  );
};
export default Page;
