export const dynamic = "force-dynamic";
import { getOrderById } from "@/lib/actions/order.actions";

export default async function CheckoutPaymentPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await getOrderById(orderId);
  return <div>CheckoutPaymentPage</div>;
}
