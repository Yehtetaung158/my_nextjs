import { db } from "@/server";
import { products } from "@/server/schema";
import React from "react";
import { DataTable } from "./data-table";
import placeHolerImg from "@/public/istockphoto-1147544807-612x612.jpg";
import { columns } from "./columns";

const Products = async () => {
  const products = await db.query.products.findMany({
    orderBy: (products, { asc }) => [asc(products.id)],
  });

  const productData = products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    imgUrl: placeHolerImg.src,
    variants: [],
  }));

  return (
    <main>
      <DataTable data={productData} columns={columns} />
    </main>
  );
};

export default Products;
