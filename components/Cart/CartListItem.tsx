import Image from "next/image";
import ProductBtn from "../Product/ProductBtn/ProductBtn";

interface Props {
  cartItem: ICartItem;
}
const CartListItem = ({ cartItem }: Props) => {
  return (
    <li
      key={cartItem.product._id}
      className="bg-light-btn dark:bg-dark-text h-fit p-2"
    >
      <Image
        src={cartItem.product.imgUrl}
        alt={cartItem.product.name}
        width={48}
        height={48}
        className="rounded w-12 aspect-square"
      />
      <h4 className="font-title">{cartItem.product.name}</h4>
      <ProductBtn productSmall={cartItem?.product} styleMode="cart" />
      <p>{cartItem.totalPrice}</p>
    </li>
  );
};

export default CartListItem;