import ProductList from "./ProductList";
import SideNav from "./SideNav";

interface Props {
  productsMap: Record<string, IProductSmall[]>;
  subProductList: string[];
}

const ProductIndex = ({ productsMap, subProductList }: Props) => {
  return (
    <div className="h-full relative flex w-full ">
      <SideNav subProductList={subProductList} />
      <ul className="pl-64 w-full gap-8 flex flex-col">
        {subProductList.map((subProduct) => (
          <li
            key={subProduct}
            id={subProduct}
            className=" scroll-mt-[9.5rem] pt-16 "
          >
            <h3 className="text-4xl font-title pb-8">{subProduct}</h3>
            <ProductList products={productsMap[subProduct]} styleMode="page" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductIndex;
