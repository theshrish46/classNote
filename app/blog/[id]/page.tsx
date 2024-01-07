import BlogPage, { BlogDataProps } from "@/components/site-components/BlogPage";
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
  });

  const token = cookies().get("accessToken");
  const decoded = token
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
      </MaxWidthWrapper>
    </>
  );
};
export default Page;
