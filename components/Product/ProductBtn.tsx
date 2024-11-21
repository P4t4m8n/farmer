"use client";

import { useState } from "react";

interface Props {
  quantityTypes: IQuantityType[];
}
const ProductBtn = ({ quantityTypes }: Props) => {
  const [quantityType, setQuantityType] = useState<IQuantityType>(
    quantityTypes[0] || { type: "kg", price: 9 }
  );
  return <div></div>;
};

export default ProductBtn;
