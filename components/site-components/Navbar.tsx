"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import MobileNav from "./MobileNav";
import { LogOutButton } from "./log-out-button";
import { currentClientUser } from "@/hooks/use-client-user";

const Navbar = async () => {
  const user = await currentClientUser();
  if (!user) {
    console.log("No user presentF");
  }

  return (
    <div className="bg-white dark:bg-black sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white dark:bg-black">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0 justify-between w-full">
                <Link
                  href={"/"}
                  className="flex justify-center items-center gap-x-1 md:gap-x-3 hover:text-blue-700 transition-all duration-150"
                >
                  <Icons.logo size={10} />
                  <p className="text-sm font-bold">classnote</p>
                </Link>
                <div className="text-2xl">{user?.name}</div>
                <div className="flex justify-center items-center gap-x-2 md:hidden">
                  <ModeToggle />
                  <MobileNav />
                </div>
                <div className="hidden md:flex justify-center items-center gap-x-3">
                  <ModeToggle />
                  <Link
                    href={"/write"}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "font-semibold text-lg"
                    )}
                  >
                    Write
                  </Link>
                  {1 && 1 ? (
                    <>
                      <LogOutButton />
                    </>
                  ) : (
                    <Link
                      href={"/auth/login"}
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          variant: "link",
                        })
                      )}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};
export default Navbar;
