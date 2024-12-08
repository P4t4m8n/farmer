import { Document, ObjectId } from "mongodb";

export interface IOrderDocument extends Document {
  userId: ObjectId; // required
  addressId: ObjectId; // required
  products: IOrderItem[]; // required
  productsPrice: number; // double
  deliveryPrice: number; // double
  status: TOrderStatus; // enum
  delivryDate?: Date; // date
  payment: IOrderPayment; // required
  isDelivered: boolean; // boolean
  userDetails: IUserDetails; // required
}

export interface IOrderDtoCreate {
  userId: ObjectId;
  addressId: ObjectId;
  products: IOrderItem[];
  productsPrice: number;
  deliveryPrice: number;
  deliveryDate: Date;
  status: TOrderStatus;
  payment: IOrderPayment;
  userDetails: IUserDetails;
  isDelivered: boolean; // boolean

}

interface IOrderItem {
  productId: ObjectId;
  quentityType: TQuantityType; // enum
  quantity: number;
  totalPrice: number;
}
