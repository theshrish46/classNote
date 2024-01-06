import Editor from "@/components/site-components/Editor";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { decodedToken } from "@/lib/jwt-token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  const token = cookies().get("accessToken");
  const decoded = token ? decodedToken(token.value) : null;
  if (!token) {
    redirect("/auth");
  }
  return (
    <MaxWidthWrapper className="container">
      <Editor />
    </MaxWidthWrapper>
  );
};
export default Page;
