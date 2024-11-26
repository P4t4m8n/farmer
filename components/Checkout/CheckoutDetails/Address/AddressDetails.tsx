import EditAddress from "../../../Address/EditAddress";
import { addressClientService } from "@/lib/client/address.client.service";
import { useState } from "react";
import CheckoutAddressList from "./CheckoutAddressList";

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
    <div className="h-[calc(100%-10rem)] overflow-auto">
      <EditAddress
        setAddresses={setAddress}
        address={addressClientService.getEmpty(order.user._id)}
      />
      <CheckoutAddressList
        addresses={stateAddresses}
        onChange={onChange}
        currentAddressId={order.address?._id || ""}
      />
    </div>
  );
};

export default AddressDetails;
