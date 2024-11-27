"use client";

import { useState } from "react";
import CheckoutDetails from "./CheckoutDetails/CheckoutDetails";
import { useCart } from "@/hooks/useCart";
import CheckoutDeliveryDetails from "./DeliveryDetails/CheckoutDeliveryDetails";
import CheckoutPaymentDetails from "./PaymentDetails/CheckoutPaymentDetails";

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
    <div className="h-full w-full  flex gap-4">
      <CheckoutDetails
        order={orderToEdit}
        addresses={addresses}
        onChangeStage={onChangeStage}
        setOrderToEdit={setOrderToEdit}
        isDetails={stage === "details"}
      />
      <CheckoutDeliveryDetails
        isDelivery={stage === "deleviry"}
        address={orderToEdit?.address}
        onChangeStage={onChangeStage}
        setOrderToEdit={setOrderToEdit}
      />
      <CheckoutPaymentDetails isPayment={stage === "payment"} />
    </div>
  );
};

export default CheckoutIndex;
