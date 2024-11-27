const getDeliveryDates = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  address: Partial<IAddress>
): {
  time: string;
  date: string;
}[] => {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= 3; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    const delivryWindow = {
      time: "15:00 - 21:00",
      date: nextDay.toISOString().split("T")[0],
      day: nextDay.toLocaleString("en-US", { weekday: "long" }),
    };
    dates.push(delivryWindow);
  }

  return dates;
};

export const deliveryUtil = {
  getDeliveryDates,
};
