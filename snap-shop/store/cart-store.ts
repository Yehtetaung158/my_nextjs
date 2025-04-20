import { create } from "zustand";

export type Variant = {
  variantId: number;
  quantity: number;
};

export type cartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  variants: Variant;
};

export type cartType = {
  cart: cartItem[];
  addToCart: (item: cartItem) => void;
  reduceQuantity: (item: cartItem) => void;
};

export const useCartStore = create<cartType>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        const updatedCart = state.cart.map((cartItem) => {
          if (cartItem.variants.variantId === item.variants.variantId) {
            return {
              ...cartItem,
              variants: {
                ...cartItem.variants,
                quantity: cartItem.variants.quantity + item.variants.quantity,
              },
            };
          }
          return cartItem;
        });
        return {
          cart: updatedCart,
        };
      } else {
        return {
          cart: [
            ...state.cart,
            {
              ...item,
              variants: { ...item.variants, quantity: item.variants.quantity },
            },
          ],
        };
      }
    }),
  reduceQuantity: (item) =>
    set((state) => {
      const updatedCart = state.cart.map((cartItem) => {
        if (cartItem.variants.variantId === item.variants.variantId) {
          return {
            ...cartItem,
            variants: {
              ...cartItem.variants,
              quantity: cartItem.variants.quantity - 1,
            },
          };
        }
        return cartItem;
      });
      return {
        cart: updatedCart.filter((cartItem) => cartItem.variants.quantity > 0),
      };
    }),
}));
