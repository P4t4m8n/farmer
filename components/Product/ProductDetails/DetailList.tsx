import DetailItem from "./DetailItem";

interface Props {
  items: { label: string; value: string }[];
}
const DetailList = ({ items }: Props) => {
  return (
    <>
      {" "}
      {items.map((item) => (
        <DetailItem key={item.label} label={item.label} value={item.value} />
      ))}
    </>
  );
};

export default DetailList;
