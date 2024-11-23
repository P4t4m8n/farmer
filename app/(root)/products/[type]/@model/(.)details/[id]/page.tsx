import ProductDetailsModel from "@/components/Product/ProductDetails/ProductDetails";
import DialogWarpper from "@/components/Wrappers/DialogWarpper";
import { getProductById } from "@/lib/actions/product.actions";
import { redirect } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string; type: string }>;
}) {
  const { id, type } = await params;

  const product = await getProductById(id, false);
  if (!product) return redirect(`/products/${type}`);

  return (
    <DialogWarpper>
      <ProductDetailsModel product={product} />
    </DialogWarpper>
  );
}
