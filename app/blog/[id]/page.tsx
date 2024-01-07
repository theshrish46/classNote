import BlogPage, { BlogDataProps } from "@/components/site-components/BlogPage";
import Comment from "@/components/site-components/Comment";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { db } from "@/lib/db";
import { decodedToken } from "@/lib/jwt-token";
import { cookies } from "next/headers";

type JwtPayload = {
  id: string;
  name: string;
};
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

  const token = cookies().get("accessToken");
  const decoded: any = token
    ? (decodedToken(token?.value as string) as JwtPayload)
    : null;
  return (
    <>
      <MaxWidthWrapper className="container">
        <BlogPage
          data={post as BlogDataProps}
          decodedToken={decoded as JwtPayload}
          key={post?.id}
        />
        {decoded.id == post?.authorId ? null : (
          <>
            <Comment postId={params.id} decodedToken={decoded} />
          </>
        )}
      </MaxWidthWrapper>
    </>
  );
};
export default Page;
