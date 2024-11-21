import React, { FC } from "react";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./authContext";

interface Props {
  children: React.ReactNode;
}

export const AppProvider: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};
