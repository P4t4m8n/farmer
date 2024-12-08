import Button from "@/components/General/Button";
import Input from "@/components/General/Input";
import { apiClientService } from "@/lib/client/api.client.service";
import { useEffect, useState } from "react";
import CheckoutsHeader from "../CheckoutShared/CheckoutsHeader";
import CheckoutsOverlay from "../CheckoutShared/CheckoutsOverlay";

interface Props {
  isDelivery: boolean;
  currentCity: string | null;
  onChangeStage: (stage: TCheckoutStage) => void;
}
const CheckoutDelivery = ({
  isDelivery,
  currentCity,
  onChangeStage,
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
        `delivery?${currentCity ? `city=${currentCity}` : ""}`
      );
      setDeliveries(_deliveries);
    } catch (error) {
      console.error("Error getting deliveries", error);
      setDeliveries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    stage: TCheckoutStage
  ) => {
    const form = (e.currentTarget.closest("form") as HTMLFormElement) || null;

    // Check form validity
    if (form && !form.checkValidity()) {
      e.preventDefault(); // Prevent default action if form is invalid
      form.reportValidity(); // Show validation feedback to the user
      return;
    }

    onChangeStage(stage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const delivery = deliveries?.find((delivery) => delivery.date === value);
    setCurrentDelivery(delivery);
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
                  name: "deliveryDate",
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
          onClick={(ev) => handleNextClick(ev, "confirm")}
          style="primary"
          size="medium"
          className="border mt-auto"
        >
          To finalized
        </Button>
      )}
      <CheckoutsOverlay
        isHidden={isDelivery}
        hanldeChangeStage={(ev) => handleNextClick(ev, "deleviry")}
      />
    </div>
  );
};

export default CheckoutDelivery;
