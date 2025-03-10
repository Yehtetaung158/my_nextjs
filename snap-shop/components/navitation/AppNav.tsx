"use client";

import React from "react";
import NavLogo from "./NavLogo";
import UserButton from "./UserButton";

const AppNav = () => {
  return (
    <div className="flex items-center justify-between w-full bg-red-300">
      <NavLogo />
      <UserButton />
    </div>
  );
};

export default AppNav;
