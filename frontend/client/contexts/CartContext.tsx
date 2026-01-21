"use client";
import { LocalCartType } from "@/components/Product/ProductDisplay";
import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type CartContextType = {
  cartLocal: LocalCartType[];
  setCartLocal: Dispatch<SetStateAction<LocalCartType[]>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartDataProvider({ children }: { children: ReactElement }) {
  const [cartLocal, setCartLocal] = useState<LocalCartType[]>(() => {
    return JSON.parse(localStorage.getItem("cart") as string) || [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartLocal));
  }, [cartLocal]);
  return React.createElement(
    CartContext.Provider,
    { value: { cartLocal, setCartLocal } },
    children,
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartDataProvider");
  }
  return ctx;
}
