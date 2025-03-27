"use client";
// import React from 'react'
import { Button } from "../ui/button";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
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
import { redirect } from "next/navigation";

const UserButton = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <SessionProvider session={session} refetchInterval={5}>
      <div className=" flex justify-center items-center">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.image!} />
                <AvatarFallback className="bg-primary text-white w-full h-full flex items-center justify-center">
                  {user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2">
              <div className=" flex gap-2 bg-primary p-2 rounded-lg items-center justify-center">
                <Avatar>
                  <AvatarImage src={user.image!} />
                  <AvatarFallback className=" bg-white text-primary font-bold w-full h-full flex items-center justify-center">
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2 text-white">
                  <h3>{user?.name}</h3>
                  <h3>{user?.email}</h3>
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
          <>
            {status === "unauthenticated" ? (
              <Button asChild>
                <Link href="/auth/login">
                  <span className="text-sm font-medium">Login</span>
                </Link>
              </Button>
            ) : (
              <p>Loading...</p>
            )}
          </>
        )}
      </div>
    </SessionProvider>
  );
};

export default UserButton;
