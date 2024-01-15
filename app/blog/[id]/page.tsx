"use server";
import BlogPage from "@/components/site-components/BlogPage";
import CommentBox from "@/components/site-components/Comment";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { db } from "@/lib/db";
import { currentServerUser } from "@/hooks/use-server-user";
import { Comment } from "@prisma/client";

const Page = async ({ params }: { params: { id: string } }) => {
  const post = await db.post.findFirst({
    where: {
      id: params.id,
    },
    include: {
      comments: true,
    },
  });

  const comments = await db.comment.findMany({
    where: {
      postId: params.id,
    },
    include: {
      user: false,
    },
  });
  if (!post) {
    return { error: "No Posts available" };
  }

  if (!comments) {
    return { error: "No comments available" };
  }
  console.log("type of comments", typeof comments);
  const user = await currentServerUser();
  if (!user) {
    return { error: "Unauthorized" };
  }
  return (
    <>
      <MaxWidthWrapper className="container">
        <BlogPage data={post} comments={comments} user={user} key={post?.id} />
        {user.id == post?.authorId ? null : (
          <>
            <CommentBox postId={params.id} decodedToken={user} />
          </>
        )}
      </MaxWidthWrapper>
    </>
  );
};
export default Page;
