"use client";
import React, { createContext, FC, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

type Subscriber = () => void;

interface CartProvider {
  getCartItem: (productId: string) => ICartItem | undefined;
  updateCart: (
    product: IProductSmall,
    quantityType: IQuantityType,
    amount: number
  ) => void;
  subscribe: (productId: string | null, callback: Subscriber) => () => void;
  clearCart: () => void;
  getAllCartItems: () => ICartItem[];
}

export const CartContext = createContext<CartProvider | undefined>(undefined);

export const CartProvider: FC<Props> = ({ children }) => {
  const cartItemsRef = useRef<{ [productId: string]: ICartItem }>({});
  const itemSubscribersRef = useRef<{ [productId: string]: Set<Subscriber> }>(
    {}
  );
  const cartSubscribersRef = useRef<Set<Subscriber>>(new Set());

  const getCartItem = (productId: string) => {
    return cartItemsRef.current[productId];
  };

  const getAllCartItems = () => {
    return Object.values(cartItemsRef.current);
  };

  const updateCart = (
    product: IProductSmall,
    quantityType: IQuantityType,
    amount: number
  ) => {
    const productId = product._id!;
    if (amount < 1) {
      delete cartItemsRef.current[productId];
   
    } else {
      cartItemsRef.current[productId] = {
        product,
        quantityType,
        amount,
        totalPrice: amount * quantityType.price,
      };
    }

    // Notify item-specific subscribers
    const itemSubscribers = itemSubscribersRef.current[productId];
    if (itemSubscribers) {
      itemSubscribers.forEach((callback) => callback());
    }

    // Notify cart-wide subscribers
    cartSubscribersRef.current.forEach((callback) => callback());
  };

  const subscribe = (productId: string | null, callback: Subscriber) => {
    if (productId) {
      // Subscribe to specific cart item
      if (!itemSubscribersRef.current[productId]) {
        itemSubscribersRef.current[productId] = new Set();
      }
      itemSubscribersRef.current[productId].add(callback);

      // Return unsubscribe function
      return () => {
        itemSubscribersRef.current[productId].delete(callback);
        if (itemSubscribersRef.current[productId].size === 0) {
          delete itemSubscribersRef.current[productId];
        }
      };
    } else {
      // Subscribe to cart-wide changes
      cartSubscribersRef.current.add(callback);

      // Return unsubscribe function
      return () => {
        cartSubscribersRef.current.delete(callback);
      };
    }
  };

  const clearCart = () => {
    cartItemsRef.current = {};

    // Notify all subscribers
    Object.values(itemSubscribersRef.current).forEach((subscribersSet) => {
      subscribersSet.forEach((callback) => callback());
    });

    cartSubscribersRef.current.forEach((callback) => callback());
  };

  const contextValue = {
    getCartItem,
    getAllCartItems,
    updateCart,
    subscribe,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
