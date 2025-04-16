import { VariantsWithProduct } from "@/lib/infer-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type productProps = {
  productWithVariants: VariantsWithProduct[];
};

const Products = ({ productWithVariants }: productProps) => {
  return (
    <main className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {productWithVariants.map((p) => {
        return (
          <Link
            key={p.id}
            className="bg-white p-2 rounded-md "
            href={`/products/${p.id}?vid=${p.id}&productId=${p.productId}&type=${p.productType}&image=${p.variantImages[0].image_url}&title=${p.product.title}&price=${p.product.price}`}
          >
            <Image
              src={p.variantImages[0].image_url}
              alt={p.product.title}
              width={600}
              height={400}
            />
            <hr className="my-2" />
            <h3 className="font-semibold">
              {p.product.title.substring(0, 26) + "..."}
            </h3>
            <p>
              {p.product.price.toLocaleString("USD", {
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </p>
          </Link>
        );
      })}
    </main>
  );
};

export default Products;
