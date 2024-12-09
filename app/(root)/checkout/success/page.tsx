export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  console.log(await searchParams);
  return <div>page</div>;
}
