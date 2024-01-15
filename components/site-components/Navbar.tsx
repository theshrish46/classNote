import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { ModeToggle } from "../mode-toggle";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import MobileNav from "./MobileNav";
import { LogOutButton } from "./log-out-button";
import { currentServerUser } from "@/hooks/use-server-user";
import { NavBarComponent } from "./NavBarComponent";

const Navbar = async () => {
  const user = await currentServerUser();
  if (!user) {
    console.log("No user presentF");
  }

  return (
    <div className="bg-white dark:bg-black sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white dark:bg-black">
        <MaxWidthWrapper>
          <NavBarComponent user={user} />
        </MaxWidthWrapper>
      </header>
    </div>
  );
};
export default Navbar;
