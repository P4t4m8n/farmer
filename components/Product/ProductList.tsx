import ProductPreview from "./ProductPreview";

interface Props {
  products: IProductSmall[];
}
const ProductList = ({ products }: Props) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" >
      {products?.map((product) => (
        <ProductPreview product={product} key={product._id} />
      ))}
    </ul>
  );
};

export default ProductList;
