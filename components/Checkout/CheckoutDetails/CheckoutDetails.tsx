import Button from "@/components/General/Button";
import CheckoutAddressDetails from "./Address/CheckoutAddressDetails";
import CheckoutPersonalDetails from "./Personal/CheckoutPersonalDetails";
import CheckoutsHeader from "../Shared/CheckoutsHeader";
import CheckoutsOverlay from "../Shared/CheckoutsOverlay";

interface Props {
  order: IOrder;
  addresses: IAddress[];
  isDetails: boolean;
  onChangeStage: (stage: "details" | "deleviry" | "payment") => void;
  setOrderToEdit: React.Dispatch<React.SetStateAction<IOrder>>;
}
const CheckoutDetails = ({
  order,
  addresses,
  isDetails,
  onChangeStage,
  setOrderToEdit,
}: Props) => {
  return (
    <div className="dark:bg-inherit flex flex-col gap-4 h-full w-1/3 relative ">
      <CheckoutsHeader text="Personal Details" />
      <CheckoutPersonalDetails
        {...order.userDetails}
        setOrderToEdit={setOrderToEdit}
      />
      <CheckoutAddressDetails
        addresses={addresses}
        setOrderToEdit={setOrderToEdit}
        order={order}
      />
      {isDetails && (
        <Button
          disabled={!order?.address}
          onClick={() => onChangeStage("deleviry")}
          style="primary"
          size="medium"
          className="border"
        >
          Next
        </Button>
      )}
      <CheckoutsOverlay
        isHidden={isDetails}
        hanldeChangeStage={() => onChangeStage("details")}
      />
    </div>
  );
};

export default CheckoutDetails;
