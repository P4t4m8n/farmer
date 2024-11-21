import mongoose, { Document } from "mongoose";

export interface IOrderModel extends Document {
  user: mongoose.Types.ObjectId;
  orderAddress: mongoose.Types.ObjectId;
  orderDate: Date;
  totalPrice: number;
  status: TOrderStatus;
  products: IOrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}

interface IOrderProduct extends Document {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IProductModel extends Document {
  name: string;
  imgsUrl?: string[];
  family?: string;
  season?: TSeason;
  productType: TProductType;
  subProductType?: string;
  description?: string;
  nutrition?: INutrition;
  quantity: number;
  discount?: number;
  rating?: number;
  quantityType: IQuantityType[];
  createdAt?: Date;
  updatedAt?: Date;
}


interface INutrition {
  calories?: number;
  protein?: number;
  fat?: number;
  carbohydrates?: number;
  fiber?: number;
  vitamins?: string[];
  minerals?: string[];
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addressesId?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAddressModel extends Document {
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}
