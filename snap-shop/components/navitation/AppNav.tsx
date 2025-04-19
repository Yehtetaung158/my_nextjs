import React, { useEffect } from "react";
import NavLogo from "./NavLogo";
import UserButton from "./UserButton";
import CartBtn from "../cart/cart-btn";

const AppNav = async () => {
  return (
    <div className="flex items-center justify-between w-full ">
      <NavLogo />
      <div className="flex items-center gap-4 cursor-pointer">
        <CartBtn />
        <UserButton />
      </div>
    </div>
  );
};

export default AppNav;
