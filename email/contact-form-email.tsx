import React from "react";
import {
  Html,
  Body,
  Heading,
  Container,
  Button,
  Img,
  Link,
  Text,
  Tailwind,
} from "@react-email/components";

import { Icons } from "@/components/site-components/Icons";
import logoicon from "@/public/assets/logo/logoasset.svg";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function ContactFormEmail({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading className="text-3xl font-semibold text-primary">
            Thankyou for registering your account
          </Heading>
          <Text className="text-3xl font-medium text-gray-900 text-muted-foreground">
            Thankyou for joining the application please verify your email and
            start writing and sharing your blogs with us.{" "}
          </Text>
          {/* <Img src={logoicon} alt="logoicon" /> */}
          <Icons.logo width={56} height={56} />

          <Button
            className={
              "px-4 py-2 bg-blue-600 text-white font-semibold text-2xl"
            }
          >
            <Link
              href={`https://classnote-project.vercel.app/verify-email/?token=${token}&to=${email}`}
            >
              Authorize email
            </Link>
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
