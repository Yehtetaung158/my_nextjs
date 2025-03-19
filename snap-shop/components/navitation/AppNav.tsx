"use client";

import React, { useEffect } from "react";
import NavLogo from "./NavLogo";
import UserButton from "./UserButton";
import useSessionData from "./useSessionData";

const AppNav = () => {
  return (
    <div className="flex items-center justify-between w-full ">
      <NavLogo />
      <UserButton />
    </div>
  );
};

export default AppNav;
