import AddressItem from "@/components/Address/AddressItem";
import Input from "@/components/General/Input";

interface Props {
  addresses: IAddress[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentAddressId: string;
}
const CheckoutAddressList = ({
  addresses,
  onChange,
  currentAddressId,
}: Props) => {
  return (
    <ul className=" grid gap-4">
      {addresses.map((address) => (
        <li
          key={address._id}
          className={`bg-inherit rounded border p-2 font-text border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full hover:cursor-pointer ${
            currentAddressId === address._id
              ? " bg-green-600 dark:bg-green-600"
              : ""
          } `}
        >
          <Input
            inputProps={{
              type: "radio",
              name: address?._id || "",
              id: address._id,
              value: address._id,
              onChange,
              hidden: true,
              checked: currentAddressId === address._id,
            }}
          >
            <AddressItem address={address} />
          </Input>
        </li>
      ))}
    </ul>
  );
};

export default CheckoutAddressList;
