"use client";

import { useCartItem } from "@/components/hooks/useCartItem";
import { MinusSvg, PlusSvg } from "@/components/Icons/Icons";
import { memo, useCallback, useEffect, useState } from "react";

interface Props {
  productSmall: IProductSmall;
}
const ProductBtn = memo(function ProductBtn({ productSmall }: Props) {
  const productId = productSmall._id!;
  
  const { cartItem, updateCart } = useCartItem(productId);

  const [quantityType, setQuantityType] = useState<
    IQuantityType & { amount: number }
  >({
    ...productSmall.quantityType[0],
    amount: cartItem?.amount || 0,
  });

  useEffect(() => {
    if (cartItem) {
      const { quantityType: cartQuantityType, amount } = cartItem;
      setQuantityType({ ...cartQuantityType, amount });
    } else if (quantityType.amount !== 0) {
      setQuantityType({ ...productSmall.quantityType[0], amount: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem]);

  const handleAmountChange = useCallback(
    (amount: number) => {
      updateCart(productSmall, quantityType, amount);
    },
    [updateCart, productSmall, quantityType]
  );

  const quantityTypeChange = useCallback(
    (qType: IQuantityType) => {
      setQuantityType({ ...qType, amount: quantityType.amount });
      if (quantityType.amount > 0)
        updateCart(productSmall, qType, quantityType.amount);
    },
    [quantityType.amount, productSmall, updateCart]
  );

  return (
    <div>
      <ul className="flex gap-2 border rounded-3xl bg-inherit p-1">
        {productSmall.quantityType?.map((qType) => (
          <li key={qType?.type}>
            <input
              type="radio"
              id={`${qType?.type}${productSmall._id || "1"}`}
              name={qType?.type}
              className="peer hidden"
              checked={quantityType?.type === qType?.type}
              onChange={() => quantityTypeChange(qType)}
            />
            <label
              className={`peer rounded-3xl cursor-pointer  py-1 px-2 text-sm font-semibold font-text ${
                quantityType?.type === qType?.type ? "bg-white text-black" : ""
              }`}
              htmlFor={`${qType?.type}${productSmall._id}`}
            >
              {qType?.type}
            </label>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center pt-4 gap-4">
        <button
          onClick={() => handleAmountChange(quantityType.amount - 1)}
          disabled={quantityType?.amount < 1}
        >
          <MinusSvg />
        </button>
        <span className="text-lg ">{quantityType?.amount}</span>
        <button onClick={() => handleAmountChange(quantityType.amount + 1)}>
          <PlusSvg />
        </button>
      </div>
    </div>
  );
});

export default ProductBtn;
