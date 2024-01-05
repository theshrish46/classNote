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
  //   console.log("posts", post);
  const token = cookies().get("accessToken");
  const decoded = decodedToken(token?.value);
  return (
    <div>
      <MaxWidthWrapper>
        <BlogPage data={post} token={decoded} key={post?.id} />
      </MaxWidthWrapper>
    </div>
  );
};
export default Page;
