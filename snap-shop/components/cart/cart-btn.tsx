"use client";
import React from "react";
import CartDrawer from "./cart-drawer";
import { Divide } from "lucide-react";
import { ShoppingCart } from "lucide-react";

const CartBtn = () => {
  return (
    <CartDrawer>
      <div className="relative">
        <ShoppingCart size={24} strokeWidth="3" />
        <span className="absolute top-[-8px] right-[-8px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-primary rounded-full">
          1
        </span>
      </div>
    </CartDrawer>
  );
};

export default CartBtn;
