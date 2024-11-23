import Home from "@/components/Home/Home";
import { getProducts } from "@/lib/actions/product.actions";

export default async function HomeServer() {

  const products = await getProducts({});
  return <Home products={products} />;
}
