"use client";

import { CircleUser, Hammer, Pen } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { currentClientUser } from "@/hooks/use-client-user";
import { logout } from "@/actions/auth-actions/logout";

const MobileNav = ({ user }: { user: any }) => {
  const handleLogout = () => {
    logout();
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <Hammer />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>classnote</SheetTitle>
          <SheetDescription>Write and publish your own blogs</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-start items-start gap-y-5">
          <div className="">
            <Button
              variant={"link"}
              size={"sm"}
              className="text-sm font-semibold hover:bg-secondary/90"
            >
              <Link href={"/write"}>Write</Link>
            </Button>
          </div>

          <div className="">
            {user ? (
              <Button
                variant={"ghost"}
                onClick={handleLogout}
                size={"sm"}
                className="text-sm px-2 py-2 font-semibold bg-destructive/80"
              >
                Logout
              </Button>
            ) : (
              <Button>
                <Link href={"/auth/login"}>Login</Link>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

// <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="focus-visible:ring-0">
//           <CircleUser size={18} />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         align="end"
//         className="absolute top-2 right-5 z-50 shadow-md rounded-md px-2 py-2 flex flex-col justify-center items-center"
//       >
//         <DropdownMenuItem className="my-2">
//           <Link
//             href={"/write"}
//             className="flex justify-between items-center gap-x-1"
//           >
//             <Pen size={12} />
//             <span className="text-sm font-bold">Write</span>
//           </Link>
//         </DropdownMenuItem>

//         <DropdownMenuItem>
//           <Button
//             className={cn(
//               buttonVariants({ variant: "destructive" }),
//               "text-sm flex justify-center items-center gap-x-1"
//             )}
//           >
//             <CircleUser size={12} />
//             <span className="text-sm font-bold">Logout</span>
//           </Button>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
