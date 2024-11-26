import Input from "@/components/General/Input";
import AddAddress from "./AddAddress";
import { addressClientService } from "@/lib/client/address.client.service";
import { useState } from "react";

interface Props {
  order: IOrder;
  addresses: IAddress[];
  setOrderToEdit: React.Dispatch<React.SetStateAction<IOrder>>;
}
const AddressDetails = ({ order, addresses, setOrderToEdit }: Props) => {
  const [stateAddresses, setStateAddresses] = useState<IAddress[]>(addresses);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log("value:", value)
    const address = stateAddresses.find((address) => address?._id === value);
    if (!address) return;
    setOrderToEdit((prev) => ({
      ...prev,
      address,
    }));
  };

  const setAddress = (address: IAddress) => {
    setStateAddresses((prev) => [...prev, address]);
  };
  return (
    <ul className="h-[calc(50%-2rem)] grid gap-4">
      <AddAddress
        setAddresses={setAddress}
        address={addressClientService.getEmpty(order.user._id)}
      />
      {stateAddresses.map((address) => (
        <li
          key={address._id}
          className="bg-inherit rounded border p-2 font-text  border-dark-btn text-dark-text dark:border-light-btn dark:text-light-text w-full hover:cursor-pointer"
        >
          <Input
            inputProps={{
              type: "radio",
              name: address?._id||"",
              id: address._id,
              value: address._id,
              onChange,
              checked: order.address?._id === address._id,
            }}
          >
            <div className="hover:cursor-pointer">
              <span className="flex gap-2 ">
                <p>{address.street.name}</p>
                <p>{address.street.number}</p>
              </span>
              <span className="flex gap-2">
                {address.street.floor && (
                  <p>{`Floor ${address.street.floor}, `}</p>
                )}
                {address.street.apartment && (
                  <p>{`Apartment ${address.street.apartment}, `}</p>
                )}
                {address.street.entrance && (
                  <p>{`Entrance ${address.street.entrance}`}</p>
                )}
              </span>
              <span className="flex hap-1">
                <p>{address.city}, </p>
                <p>{address.state}</p>
                <p>{address.country}, </p>
              </span>
              <span>{address.zipCode}</span>
            </div>
          </Input>
        </li>
      ))}
    </ul>
  );
};

export default AddressDetails;
