import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavLogo = () => {
  return (
    <Link href="/" className="text-lg font-bold text-primary">
      <ShoppingBasket size={52}/>
    </Link>
  );
};

export default NavLogo;
