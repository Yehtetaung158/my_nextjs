"use client";

import React, { useEffect } from "react";
import NavLogo from "./NavLogo";
import UserButton from "./UserButton";
import useSessionData from "./useSessionData";

const AppNav = () => {
  const  session  = useSessionData();
  console.log("I am session data in app nav ---------->", session);
  useEffect(() => {
    console.log("I am session data in app nav useEffect ---------->", session)
  }, [session]);  
  return (
    <div className="flex items-center justify-between w-full ">
      <NavLogo />
      <UserButton />
    </div>
  );
};

export default AppNav;
