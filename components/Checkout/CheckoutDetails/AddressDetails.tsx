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
    <ul className="h-[calc(50%-2rem)]">
      <AddAddress
        setAddresses={setAddress}
        address={addressClientService.getEmpty(order.user._id)}
      />
      {stateAddresses.map((address) => (
        <li key={address._id}>
          <Input
            inputProps={{
              type: "radio",
              name: "address",
              value: address._id,
              onChange,
              checked: order.address?._id === address._id,
            }}
          >
            <div>
              <p>{Object.values(address.street).join(" ")}</p>
              <p>{address.city}</p>
              <p>{address.state}</p>
              <p>{address.country}</p>
              <p>{address.zipCode}</p>
            </div>
          </Input>
        </li>
      ))}
    </ul>
  );
};

export default AddressDetails;
