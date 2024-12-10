import CheckoutCreditCardForm from "./CheckoutCreditCardForm";

interface Props {
  order: Partial<IOrder>;
}
export default function CheckoutPayment({ order }: Props) {
  const { productsPrice, deliveryPrice, deliveryDate, address, userDetails,_id } =
    order as IOrder;
  const day = new Date(deliveryDate).toLocaleString("en-us", {
    weekday: "long",
  });
  const date = new Date(deliveryDate).toLocaleString("en-us", {
    day: "numeric",
  });
  const window = new Date(deliveryDate).toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const total = productsPrice + deliveryPrice;
  const street = Object.values(address?.street || {}).join(" ");

  const deliverTo = `${userDetails.firstName} ${userDetails.lastName}`;
  return (
    <div>
      <div>
        <span className="flex items-center justify-between">
          <h4>Total items cost</h4>
          <p>{productsPrice}$</p>
        </span>
        <span className="flex items-center justify-between">
          <h3>Delivery</h3>
          <p>{deliveryPrice}$</p>
        </span>
        <span className="flex items-center justify-between">
          <h3>Total</h3>
          <p>{total}$</p>
        </span>
      </div>
      <div>
        <h2>Delivery time</h2>
        <span>
          <h3>Date</h3>
          <p>{date}</p>
        </span>
        <span>
          <h3>Day</h3>
          <p>{day}</p>
        </span>
        <span>
          <h3>Time</h3>
          <p>from - {window} to 2:00 PM</p>
        </span>
      </div>
      <div>
        <h2>Delivery address</h2>
        <span>
          <h3>City</h3>
          <p>{address?.city}</p>
        </span>
        <span>
          <h3>Street</h3>
          <p>{street}</p>
        </span>
      </div>
      <div>
        <h2>Deliver to</h2>
        <p>{deliverTo}</p>
        <h3>Phone</h3>
        <p>{userDetails.phone}</p>
      </div>
      <CheckoutCreditCardForm orderId={_id!}/>
    </div>
  );
}
