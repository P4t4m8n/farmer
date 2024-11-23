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

  const products = await getProducts({ productType });

  const subProductList = productUtil.getProductSubList(productType);

  const productsMap: Record<string, IProductSmall[]> = {};

  products.forEach((product) => {
    if (!productsMap[product.subProductType]) {
      productsMap[product.subProductType] = [];
    }
    productsMap[product.subProductType].push(product);
  });
  return (
    <ProductIndex productsMap={productsMap} subProductList={subProductList} />
  );
}
