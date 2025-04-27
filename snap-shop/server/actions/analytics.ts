"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { orders } from "../schema";
import { users } from "../schema";
import { products } from "../schema";

export const analytics = async () => {
  try {
    const pendingOrder = await db
      .select()
      .from(orders)
      .where(eq(orders.status, "pending"));

    const completedOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.status, "completed"));

    const userCount = await db.select().from(users);

    const productCount = await db.select().from(products);

    return {
      pendingOrder: pendingOrder.length,
      totalUser: userCount.length,
      productCount: productCount.length,
      completedOrder: completedOrders.length,
    };
  } catch (error) {
    console.log(error);
  }
};
