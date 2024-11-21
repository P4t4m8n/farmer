import ProductList from "./ProductList";
import SideNav from "./SideNav";

interface Props {
  productsMap: Record<string, IProduct[]>;
  subProductList: string[];
}

const ProductIndex = ({ productsMap, subProductList }: Props) => {
  return (
    <div className="h-full relative flex w-full">
      <SideNav subProductList={subProductList} />
      <ul className="pl-64 w-full">
        {subProductList.map((subProduct) => (
          <li key={subProduct}>
            <h3 className="text-4xl font-title pb-8">{subProduct}</h3>
            <ProductList products={productsMap[subProduct]} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductIndex;
