import Link from "next/link";

interface Props {
  cartItems: ICartItem[];
}
const CartFooter = ({ cartItems }: Props) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const delivery = 42.0;
  const total = totalPrice + delivery;
  return (
    <footer className="border-t flex flex-col gap-2 h-40 ">
      <span className="flex items-center justify-between">
        <h4>Total items cost</h4>
        <p>{totalPrice}$</p>
      </span>
      <span className="flex items-center justify-between">
        <h3>Delivery</h3>
        <p>{delivery}$</p>
      </span>
      <span className="flex items-center justify-between">
        <h3>Total</h3>
        <p>{total}$</p>
      </span>
      <Link
        className="bg-white rounded-2xl text-black-1 text-center p-2 mt-auto"
        href="/checkout"
      >
        CheckOut
      </Link>
    </footer>
  );
};

export default CartFooter;
