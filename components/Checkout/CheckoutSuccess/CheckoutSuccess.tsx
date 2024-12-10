import { deliveryUtil } from "@/lib/utils/delivery.util";

interface Props {
  orderId: string;
  deliveryDate: string;
}
export default function CheckoutSuccess({ orderId, deliveryDate }: Props) {
  const date = deliveryUtil.formatDate(deliveryDate);
  return (
    <div>
      <h2>{`Your order number ${orderId} is approve and will be delivered on ${date.day} ${date.date} between ${date.time}`}</h2>
    </div>
  );
}
