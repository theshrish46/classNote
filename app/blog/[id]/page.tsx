import BlogPage from "@/components/site-components/BlogPage";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { db } from "@/lib/db";
import { decodedToken } from "@/lib/jwt-token";
import { cookies } from "next/headers";

const Page = async ({ params }: { params: { id: string } }) => {
  const post = await db.post.findFirst({
    where: {
      id: params.id,
    },
  });
  
  const token = cookies().get("accessToken");
  const decoded = token ? decodedToken(token?.value) : null;
  return (
    <>
      <MaxWidthWrapper className="container">
        <BlogPage data={post} token={decoded} key={post?.id} />
      </MaxWidthWrapper>
    </>
  );
};
export default Page;
