"use client";
import { signIn } from "next-auth/react";

import { Car, Github, GithubIcon, LucideGithub } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    console.log(provider);
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center gap-x-2 w-full">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <Car />
      </Button>
      <Button
        className="flex items-center gap-x-2 w-full"
        size="lg"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <GithubIcon />
      </Button>
    </div>
  );
};
