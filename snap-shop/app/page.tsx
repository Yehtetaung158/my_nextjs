
import Products from "@/components/products";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import React from "react";

export default async function Home() {

const productWithVariants= await db.query.productVariants.findMany({
  with:{
    variantImages:true,
    product:true,
    variantsTags:true,
  },
  orderBy:(productVariants,{desc})=>[desc(productVariants.id)]
})

  return (
    <main>
      <h2>Nav</h2>
      <Products productWithVariants={productWithVariants}/>
    </main>
  );
}
