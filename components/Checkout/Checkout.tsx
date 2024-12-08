"use client";

import { useActionState, useRef, useState } from "react";
import CheckoutDetails from "./CheckoutDetails/CheckoutDetails";
import { useCart } from "@/hooks/useCart";
import CheckoutDelivery from "./CheckoutDelivery/CheckoutDelivery";
import ConfirmOrder from "./CheckoutConfirm/ConfirmOrder";
import { saveOrder } from "@/lib/actions/order.actions";
import { orderClientService } from "@/lib/client/order.client.service";

interface Props {
  order: IOrder;
  addresses: IAddress[];
}
const CheckoutIndex = ({ order, addresses }: Props) => {
  const [stage, setStage] = useState<TCheckoutStage>("details");
  const { cartItems } = useCart();
  const currentCity = useRef<string | null>(null);

  const orderToEdit = {
    ...order,
    products: cartItems,
    productsPrice: orderClientService.calculateProductsPrice(cartItems),
    deliveryPrice: 42,
  };
  const [state, formAction, isPending] = useActionState(saveOrder, orderToEdit);


  const onChangeStage = (stage: TCheckoutStage, city?: string) => {
    if (stage === "deleviry") {
      currentCity.current = city || null;
    }
    setStage(stage);
  };

  return (
    <form action={formAction} className="h-full w-full flex gap-4">
      <CheckoutDetails
        order={orderToEdit}
        addresses={addresses}
        onChangeStage={onChangeStage}
        isDetails={stage === "details"}
      />
      <CheckoutDelivery
        isDelivery={stage === "deleviry"}
        currentCity={currentCity.current}
        onChangeStage={onChangeStage}
      />
      <ConfirmOrder
        isConfirm={stage === "confirm"}
        isSubmiting={isPending}
        productsPrice={orderToEdit.productsPrice}
        deliveryPrice={orderToEdit.deliveryPrice}
        onChangeStage={onChangeStage}
      />
    </form>
  );
};

export default CheckoutIndex;
