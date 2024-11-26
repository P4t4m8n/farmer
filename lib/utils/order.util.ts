const getEmpty = (user: IUser): IOrder => {
  return {
    user: user,
    status: "",
    address: null,
    receiptNumber: null,
    orderDate: new Date(),
    totalPrice: 0,
    products: [],
    userDetails: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone || "",
    },
  };
};

export const orderUtil = {
  getEmpty,
};
