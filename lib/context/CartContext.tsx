import { useState, createContext, FC } from "react";

interface Props {
  children: React.ReactNode;
}
interface CartProvider {
  cartItems: IProduct[];
  addToCart: (item: IProduct) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartProvider | undefined>(undefined);

export const CartProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const addToCart = (item: IProduct) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item?._id !== itemId)
    );
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
