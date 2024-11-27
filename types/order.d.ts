declare type TOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

declare interface IOrder extends IEntity {
  user: IUser;
  address: IAddress | null;
  orderDate: Date;
  totalPrice: number;
  status: OrderStatus;
  products: ICartItem[];
  createdAt?: Date;
  updatedAt?: Date;
  receiptNumber: string | null;
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

declare interface IOrderFilter {
  status?: TOrderStatus;
}

declare type TDelivery = {
  date: string;
  time: string;
  day: string;
};
