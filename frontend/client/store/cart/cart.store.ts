"use client";

import {
  LocalCartType,
  ProductType,
} from "@/components/Product/ProductDisplay";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  cart: LocalCartType[];

  addToCart: (
    product: ProductType,
    selectedVariants: Record<string, string | undefined>,
    variantId: number,
    quantity: number,
  ) => void;

  removeCart: (id: number) => void;

  addQuantity: (variantId: number) => void;

  decreaseQuantity: (variantId: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: JSON.parse(localStorage.getItem("cart") as string) ?? [],

      addToCart: (product, selectedVariants, variantId, quantity) => {
        const attributesForCart = Object.entries(selectedVariants ?? {}).map(
          ([name, value]) => ({ name, value: value ?? "" }),
        );

        const unitFinalPrice =
          product.finalPrice === 0 ? product.price : product.finalPrice;

        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.variantId === variantId,
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.variantId === variantId
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                      totalPrice: (item.quantity + quantity) * unitFinalPrice,
                      finalPrice: unitFinalPrice,
                    }
                  : item,
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                cartId: Date.now(),
                productId: product.productId,
                variantId,

                productName: product.name,
                sku: product.sku,
                productImageUrl: product.primaryImageUrl,
                description: product.description,

                price: product.price,
                quantity,
                totalPrice: unitFinalPrice * quantity,
                finalPrice: unitFinalPrice,

                addedDate: new Date().toISOString(),
                attributes: attributesForCart,
              },
            ],
          };
        });

        toast.success("Item added to cart successfully");
      },

      removeCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((value) => value.cartId !== id),
        }));
      },

      addQuantity: (variantId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.variantId === variantId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: (item.quantity + 1) * item.price,
                  finalPrice: item.price,
                }
              : item,
          ),
        }));
      },
      decreaseQuantity: (variantId) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.variantId === variantId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: (item.quantity - 1) * item.price,
                  finalPrice: item.price,
                }
              : item,
          ),
        }));
      },
    }),
    {
      name: "cart",
    },
  ),
);
