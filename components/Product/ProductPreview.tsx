import Image from "next/image";
import Link from "next/link";

interface Props {
  product: IProduct;
}
const ProductPreview = ({ product }: Props) => {
  const { _id, name, imgsUrl, quantityType } = product;
  console.log("product:", quantityType)
  const imgUrl =
    imgsUrl && imgsUrl?.length > 0 && imgsUrl[0] !== "No image found"
      ? imgsUrl[0]
      : "/1.jpeg";
  return (
    <li className="  p-4 rounded border flex flex-col items-center ">
      <Link href={`/product/${_id}`}>
        <Image
          src={imgUrl}
          alt={name}
          width={192}
          height={192}
          className=" object-cover w-48 aspect-square"
        />
        <h4>{name}</h4>
      </Link>
    </li>
  );
};

export default ProductPreview;
