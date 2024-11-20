import Link from "next/link";

interface Props {
  subProductList: string[];
}
const SideNav = ({ subProductList }: Props) => {
  return (
    <aside className=" border p-4 flex flex-col  justify-around w-56 rounded h-2/3 position absolute top-1/2 -translate-y-1/2 text-sm font-semibold">
      {subProductList.map((type) => (
        <Link key={type} href={`#${type}`}>
          {type.toUpperCase()}
        </Link>
      ))}
    </aside>
  );
};

export default SideNav;
