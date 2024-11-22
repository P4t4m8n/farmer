"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { getAllCartItems, updateCart, subscribe } = context;

  const [cartItems, setCartItems] = useState(() => getAllCartItems());

  useEffect(() => {
    const handleChange = () => {
      setCartItems(getAllCartItems());
    };
    const unsubscribe = subscribe(null, handleChange);
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { cartItems, updateCart };
};
