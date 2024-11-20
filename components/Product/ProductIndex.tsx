import ProductList from "./ProductList";
import SideNav from "./SideNav";

interface Props {
  productsMap: Record<string, IProduct[]>;
  subProductList: string[];
}

const ProductIndex = ({ productsMap, subProductList }: Props) => {
  return (
    <div className="h-full relative flex">
      <SideNav subProductList={subProductList} />
      <ul className="pl-64">
        {subProductList.map((subProduct) => (
          <li key={subProduct}>
            <h3>{subProduct}</h3>
            <ProductList products={productsMap[subProduct]} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductIndex;
