import { getProduct } from "@/lib/actions/user.actions";

export default async function VegetablesServer() {
  const vegetables = await getProduct({ productType: "vegetable" });
  console.log("vegetables:", vegetables[20])



  return <div>page</div>;
}
