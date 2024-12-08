import ProductIndex from "@/components/Product/ProductIndex";
import { getProducts } from "@/lib/actions/product.actions";
import { productUtil } from "@/lib/utils/product.util";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const productType = (type as TProductType) ?? "vegetable";
  const subProductType = "garden vegetables";

  const products = await getProducts({
    productType,
    subProductType,
    skip: 0,
    limit: 1000,
    isSmallProduct: true,
  });


  const subProductList = productUtil.getProductSubList(productType);

  return (
    <ProductIndex
      products={products}
      subProductType={subProductType}
      subProductList={subProductList}
    />
  );
}
