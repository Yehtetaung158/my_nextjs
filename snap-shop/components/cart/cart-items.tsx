import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';
import React from 'react'
import EmptyCartImg from '@/public/empty-cart.png';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Button } from '../ui/button';
import { totalPriceCalc } from '@/lib/total-price';
import formatCurrency from '@/lib/formatCurrency';

const CartItems = () => {
    const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.reduceQuantity);
  const addToCart = useCartStore((state) => state.addToCart);
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  return (
    <main className="lg:w-1/2 mx-auto">
      {cart.length === 0 ? (
        <div className="flex items-center justify-center flex-col">
          <Image src={EmptyCartImg} alt="empty cart" width={300} height={300} />
          <p className="text-center mb-10 font-mono font-medium">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart?.map((citem) => (
                <TableRow key={citem.id}>
                  <TableCell className="font-medium">{citem.name}</TableCell>
                  <TableCell>
                    <div>
                      <Image
                        className="rounded-md"
                        src={citem.image}
                        alt={citem.name}
                        width={50}
                        height={50}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Button
                        size={"sm"}
                        onClick={() => {
                          removeFromCart({
                            ...citem,
                            variants: {
                              variantId: citem.variants.variantId,
                              quantity: 1,
                            },
                          });
                        }}
                      >
                        -
                      </Button>
                      <p className="text-sm font-medium">
                        {citem.variants.quantity}
                      </p>
                      <Button
                        size={"sm"}
                        onClick={() => {
                          addToCart({
                            ...citem,
                            variants: {
                              variantId: citem.variants.variantId,
                              quantity: 1,
                            },
                          });
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                  {formatCurrency(Number(citem.price))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalPriceCalc(cart))}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Button
            size={"lg"}
            className="w-full mt-2 mb-6"
            onClick={() => {
              setCartPosition("Checkout");
            }}
          >
            Place Order
          </Button>
        </div>
      )}
    </main>
  );
}

export default CartItems