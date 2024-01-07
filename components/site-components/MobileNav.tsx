"use client";

import { CircleUser, Pen } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const handleLogout = () => {};
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="focus-visible:ring-0">
          <CircleUser size={18} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="absolute top-2 right-5 z-50 shadow-md rounded-md px-2 py-2 flex flex-col justify-center items-center"
      >
        <DropdownMenuItem className="my-2">
          <Link
            href={"/write"}
            className="flex justify-between items-center gap-x-1"
          >
            <Pen size={12} />
            <span className="text-sm font-bold">Write</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Button
            className={cn(
              buttonVariants({ variant: "destructive" }),
              "text-sm flex justify-center items-center gap-x-1"
            )}
          >
            <CircleUser size={12} />
            <span className="text-sm font-bold">Logout</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileNav;
