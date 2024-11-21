import Home from "@/components/Home/Home";
import { getProduct } from "@/lib/actions/user.actions";
import dbConnect from "@/lib/mongoose/db";

export default async function HomeServer() {
  await dbConnect();

  const products = await getProduct({});
  return <Home products={products} />;
}
