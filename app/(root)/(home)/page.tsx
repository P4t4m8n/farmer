import Home from "@/components/Home/Home";
import { getProducts } from "@/lib/actions/user.actions";
import dbConnect from "@/lib/mongoose/db";

export default async function HomeServer() {
  await dbConnect();

  const products = await getProducts({});
  return <Home products={products} />;
}
