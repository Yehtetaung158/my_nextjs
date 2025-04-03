"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  price: number;
  //   status: "pending" | "processing" | "success" | "failed"
  title: string;
  description: string;
  imgUrl: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "imgUrl",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("imgUrl") as string;
      const title = row.getValue("title") as string;

      return (
        <div className="w-12 h-12 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={50}
            height={50}
            className=" w-full h-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
  },
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description");
      return <span className="text-left ">{JSON.stringify(description)}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <span className="text-left ">{formatted}</span>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer text-primary focus:bg-primary/20 focus:text-primary font-medium duration-300">
              {/* <Link href={`/dashboard/create-product?edit_id=${product.id}`}> */}
                Edit Product
              {/* </Link> */}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:bg-red-200 focus:text-red-600 font-medium duration-300"
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
