import DialogWarpper from "@/components/Wrappers/DialogWarpper";
import { getProductById } from "@/lib/actions/product.actions";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id, false);

  return (
    <DialogWarpper>
      <div className="">{product?.name}</div>
    </DialogWarpper>
  );
}
