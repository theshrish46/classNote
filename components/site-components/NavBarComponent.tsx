import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { LogOutButton } from "./log-out-button";
import { ModeToggle } from "../mode-toggle";
import MobileNav from "./MobileNav";
import { Icons } from "./Icons";

export const NavBarComponent = ({ user }: { user: any }) => {
  return (
    <div>
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
            <div className="flex justify-center items-center gap-x-2 md:hidden">
              <ModeToggle />
              <MobileNav user={user}/>
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
              {user ? (
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
    </div>
  );
};
