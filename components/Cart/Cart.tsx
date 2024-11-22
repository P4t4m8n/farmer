"use client";

import { useCart } from "../../hooks/useCart";
import { BasketSvg } from "../Icons/Icons";

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <button className="w-12 h-12 relative">
      <BasketSvg className="w-12 h-12 fill-none stroke-white border p-2 rounded" />
      <div className=" absolute -top-2 -right-2 bg-white text-black rounded-full w-6 text-sm font-semibold aspect-square flex items-center justify-center justify-items-center">
        {cartItems.length}
      </div>
    </button>
  );
};

export default Cart;
