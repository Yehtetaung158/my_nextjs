import Products from "@/components/products";
import SearchBox from "@/components/products/search-box";
import { db } from "@/server";
import React from "react";

export default async function Home() {
  const productWithVariants = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      product: true,
      variantsTags: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  return (
    <main className=" relative">
      <div >
      <SearchBox productWithVariants={productWithVariants} />
      </div>
      <Products productWithVariants={productWithVariants} />
    </main>
  );
}
