import React from "react";
import CartListItem from "./CartListItem";

interface Props {
  cartItems: ICartItem[];
}
const CartList = ({ cartItems }: Props) => {
  return (
    <ul className="h-[calc(100%-14rem)] overflow-auto grid gap-1 grid-flow-row">
      {cartItems.map((item) => (
        <CartListItem key={item.product._id} cartItem={item} />
      ))}
    </ul>
  );
};

export default CartList;
