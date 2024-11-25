"use client";

import Image from "next/image";

interface Props {
  images: string[];
}
const ImageGallray = ({ images }: Props) => {
  return (
    <ul>
      {images.map((img, idx) => (
        <Image key={idx} src={img} width={64} height={64} alt="product-image" />
      ))}
    </ul>
  );
};

export default ImageGallray;
