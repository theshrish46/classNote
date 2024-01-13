import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { decodedToken } from "@/lib/jwt-token";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import Link from "next/link";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: PageProps) => {
  const cookieToken = cookies().get("accessToken");
  const decoded = cookieToken
    ? JSON.stringify(decodedToken(cookieToken?.value))
    : null;
  const user = await db.user.findFirst({
    where: {
      id: decoded?.id as any,
    },
  });
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <MaxWidthWrapper>
      <div>
        {toEmail}
        {token}
        {token == user?.verificationToken ? (
          <div>
            User email is authorized
            <Link href={"/"}>Home</Link>
          </div>
        ) : (
          <div>
            {toEmail ? (
              <div>We have sent and email to {toEmail}</div>
            ) : (
              <div>Please check your email</div>
            )}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
