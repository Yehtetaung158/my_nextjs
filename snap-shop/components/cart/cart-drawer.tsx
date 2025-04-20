import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
import CartItems from "./cart-items";
 
  type CartDrawerProps = {
    children: React.ReactNode;
  };
  const CartDrawer = ({ children }: CartDrawerProps) => {
    return (
      <>
        <Drawer>
          <DrawerTrigger>{children}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-center">Your Cart</DrawerTitle>
              <DrawerDescription className="text-center mb-10">
                thank for shopping with icore.
              </DrawerDescription>
            </DrawerHeader>
            <CartItems/>
          </DrawerContent>
        </Drawer>
      </>
    );
  };
  
  export default CartDrawer;
  