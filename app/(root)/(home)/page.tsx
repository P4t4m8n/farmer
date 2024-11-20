import Home from "@/components/Home/Home";
import { getProduct } from "@/lib/actions/user.actions";

export default async function HomeServer() {

  const products = await getProduct({});
  return <Home products={products} />;
}
