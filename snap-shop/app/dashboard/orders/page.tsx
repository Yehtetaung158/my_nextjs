import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { orders } from "@/server/schema";
import { format } from "path";
import formatCurrency from "@/lib/formatCurrency";
import Image from "next/image";

const Order = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }
  const ordersArray = await db.query.orders.findMany({
    where: eq(orders.userID, session.user.id),
    with: {
      orderProduct: {
        with: {
          product: true,
          productVariants: {
            with: {
              variantImages: true,
            },
          },
          order: true,
        },
      },
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>view your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className=" overflow-x-auto">
          <TableCaption>A list of your orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Order ID</TableHead>
              <TableHead className="text-left">Total</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersArray.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(order.total)}
                </TableCell>
                <TableCell className="font-medium">
                  {order.created?.toDateString()}
                </TableCell>
                <TableCell className="font-medium">{order.status}</TableCell>
                <TableCell className="font-medium">
                  <Dialog>
                    <DialogTrigger className=" underline">
                      View Detail
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Detail of order #{order.id}</DialogTitle>
                        <DialogDescription>
                          Order's total price is {formatCurrency(order.total)}
                        </DialogDescription>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Variant</TableHead>
                            <TableHead className="text-right">
                              Quantity
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.orderProduct.map(
                            ({ product, productVariants, quantity }) => (
                              <TableRow key={product.id}>
                                <TableCell className="font-medium">
                                  <Image
                                    width={50}
                                    height={50}
                                    src={
                                      productVariants.variantImages[0]
                                        ?.image_url ?? ""
                                    }
                                    alt={product.title}
                                    className="rounded-md"
                                  />
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>
                                  {formatCurrency(product.price)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div
                                    className="w-4 h-4 rounded-full"
                                    style={{
                                      backgroundColor: productVariants.color,
                                    }}
                                  />
                                </TableCell>
                                <TableCell className="text-right">
                                  {quantity}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Order;
