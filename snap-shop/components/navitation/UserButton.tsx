"use client";
// import React from 'react'
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import useSessionData from "./useSessionData";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut, Settings, Truck } from "lucide-react";
import { use, useEffect } from "react";
import { redirect } from "next/navigation";

const UserButton = () => {
  const { session, status } = useSessionData();
  return (
    <div className=" flex justify-center items-center">
      {session?.user?.email ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session?.user?.image!} />
              <AvatarFallback className=" bg-primary text-white w-full h-full flex items-center justify-center">
                {session?.user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <div className=" flex gap-2 bg-primary p-2 rounded-lg items-center justify-center">
              <Avatar>
                <AvatarImage src={session?.user?.image!} />
                <AvatarFallback className=" bg-white text-primary font-bold w-full h-full flex items-center justify-center">
                  {session?.user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 text-white">
                <h3>{session?.user?.name}</h3>
                <h3>{session?.user?.email}</h3>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className=" cursor-pointer">
              <Truck className="w-5 h-5 mr-3" />
              <span className=" text-sm font-medium">My Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" cursor-pointer"
              onClick={() => redirect("/dashboard/settings")}
            >
              <Settings className="w-5 h-5 mr-3" />
              <span className=" text-sm font-medium">Setting</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" cursor-pointer text-red-600"
              onClick={() => signOut()}
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className=" text-sm font-medium">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href="/auth/login">
            {status === "loading" ? "Loading..." : "Login"}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default UserButton;
