import Button from "@/components/General/Button";
import AddressDetails from "./AddressDetails";
import PersonalDetails from "./PersonalDetails";

interface Props {
  order: IOrder;
  addresses: IAddress[];
  onChangeStage: (stage: "details" | "deleviry" | "payment") => void;
  setOrderToEdit: React.Dispatch<React.SetStateAction<IOrder>>;
}
const CheckoutDetails = ({
  order,
  addresses,
  onChangeStage,
  setOrderToEdit,
}: Props) => {
  return (
    <div className="dark:bg-inherit grid gap-4 h-full w-1/3">
      <PersonalDetails {...order.userDetails} setOrderToEdit={setOrderToEdit} />
      <AddressDetails
        addresses={addresses}
        setOrderToEdit={setOrderToEdit}
        order={order}
      />
      <Button
        disabled={!order?.address}
        onClick={() => onChangeStage("deleviry")}
        style="primary"
        size="medium"
      >
        Next
      </Button>
    </div>
  );
};

export default CheckoutDetails;