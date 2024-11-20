declare type TOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

declare interface IOrder extends IEntity {
  user: mongoose.Types.ObjectId;
  orderAddress: mongoose.Types.ObjectId;
  orderDate: Date;
  totalPrice: number;
  status: OrderStatus;
  products: IOrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}

declare interface IOrderFilter {
  status?: TOrderStatus;
}
