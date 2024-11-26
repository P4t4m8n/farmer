"use client";

import { useState } from "react";
import CheckoutDetails from "./CheckoutDetails/CheckoutDetails";
import { useCart } from "@/hooks/useCart";

interface Props {
  order: IOrder;
  addresses: IAddress[];
}
const CheckoutIndex = ({ order, addresses }: Props) => {
  const [stage, setStage] = useState<"details" | "deleviry" | "payment">(
    "details"
  );
  const { cartItems } = useCart();
  const [orderToEdit, setOrderToEdit] = useState<IOrder>({
    ...order,
    products: cartItems,
  });

  const onChangeStage = (stage: "details" | "deleviry" | "payment") => {
    setStage(stage);
  };

  return (
    <div className="h-full w-full border">
      {stage === "details" && (
        <CheckoutDetails
          order={orderToEdit}
          addresses={addresses}
          onChangeStage={onChangeStage}
          setOrderToEdit={setOrderToEdit}
        />
      )}
    </div>
  );
};

export default CheckoutIndex;
