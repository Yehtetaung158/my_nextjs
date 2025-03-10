"use client";
// import React from 'react'
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import useSessionData from "./useSessionData";

const UserButton = () => {
  const { session } = useSessionData();

  console.log("I am user", session);
  return (
    <div className=" flex gap-2 items-center">
      {session?.user?.email && <p>{session?.user?.email}</p>}
      {session?.user?.email ? (
        <Button variant="destructive" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </div>
  );
};

export default UserButton;
