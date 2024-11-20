import ProductPreview from "./ProductPreview";

interface Props {
  products: IProduct[];
}
const ProductList = ({ products }: Props) => {
  return (
    <ul>
      {products?.map((product) => (
          <ProductPreview product={product} key={product._id} />
      ))}
    </ul>
  );
};

export default ProductList;
