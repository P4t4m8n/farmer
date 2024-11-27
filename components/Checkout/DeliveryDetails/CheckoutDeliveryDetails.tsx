import Button from "@/components/General/Button";
import Input from "@/components/General/Input";
import { apiClientService } from "@/lib/client/api.client.service";
import { useEffect, useState } from "react";
import CheckoutsHeader from "../Shared/CheckoutsHeader";
import CheckoutsOverlay from "../Shared/CheckoutsOverlay";

interface Props {
  isDelivery: boolean;
  address: IAddress | null;
  onChangeStage: (stage: "details" | "deleviry" | "payment") => void;
  setOrderToEdit: React.Dispatch<React.SetStateAction<IOrder>>;
}
const CheckoutDeliveryDetails = ({
  isDelivery,
  address,
  onChangeStage,
  setOrderToEdit,
}: Props) => {
  const [deliveries, setDeliveries] = useState<TDelivery[]>();
  const [currentDelivery, setCurrentDelivery] = useState<TDelivery>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isDelivery) return;
    getDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelivery]);

  const getDeliveries = async () => {
    try {
      const _deliveries = await apiClientService.get<TDelivery[]>(
        `delivery?${address?.city}`,
        {
          address,
        }
      );
      setDeliveries(_deliveries);
    } catch (error) {
      console.error("Error getting deliveries", error);
      setDeliveries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log("value:", value);
    const delivery = deliveries?.find((delivery) => delivery.date === value);
    setCurrentDelivery(delivery);
  };

  const hanldeChangeStage = () => {
    setOrderToEdit((order) => ({
      ...order,
      delivery: currentDelivery,
    }));
    onChangeStage("payment");
  };
  return (
    <div className="dark:bg-inherit flex flex-col gap-4 h-full w-1/3 relative  ">
      <CheckoutsHeader text="Delivery Details" />

      <span className="font-text w-full h-24">
        <h3 className="font-semibold text-lg">When is a good time?</h3>
        <h4 className="text-sm">
          Bla bla we are allowed to be late and allot more not delivring you
          food and bla bla bla bla bla by this bla bla and bla bla bla food and
          bla bla bla bla bla by this bla bla and bla bla bla
        </h4>
      </span>
      {!isLoading ? (
        <ul>
          {deliveries?.map((delivery, index) => (
            <li key={delivery.date + index} className="flex gap-4 items-center">
              <span>
                <h3>{delivery.day}</h3>
                {delivery.date}
              </span>
              <Input
                inputProps={{
                  type: "radio",
                  name: delivery.date,
                  id: delivery.date,
                  value: delivery.date,
                  onChange: handleChange,
                  hidden: true,
                  checked: currentDelivery?.date === delivery.date,
                }}
              >
                <span
                  className={`cursor-pointer border rounded-2xl p-2 ${
                    currentDelivery?.date === delivery.date
                      ? "bg-dark-btn dark:bg-light-btn text-light-text dark:text-dark-text"
                      : ""
                  }`}
                >
                  {delivery.time}
                </span>
              </Input>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
      {isDelivery && (
        <Button
          disabled={!currentDelivery}
          onClick={hanldeChangeStage}
          style="primary"
          size="medium"
          className="border mt-auto"
        >
          To Payment
        </Button>
      )}
      <CheckoutsOverlay
        isHidden={isDelivery}
        hanldeChangeStage={() => onChangeStage("deleviry")}
      />
    </div>
  );
};

export default CheckoutDeliveryDetails;
