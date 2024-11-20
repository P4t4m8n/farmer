import Image from "next/image";

interface Props {
  product: IProduct;
}
const ProductPreview = ({ product }: Props) => {
  const { _id, name, imgsUrl, price } = product;
  const imgUrl =
    imgsUrl && imgsUrl?.length > 0 && imgsUrl[0] !== "No image found"
      ? imgsUrl[0]
      : "/1.jpeg";
  return (
    <li>
      <Image src={imgUrl} alt={name} width={100} height={100} />
    </li>
  );
};

export default ProductPreview;
