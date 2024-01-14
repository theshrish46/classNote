import Editor from "@/components/site-components/Editor";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { decodedToken } from "@/lib/jwt-token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = () => {
  
  return (
    <MaxWidthWrapper className="container">
      <Editor />
    </MaxWidthWrapper>
  );
};
export default Page;
