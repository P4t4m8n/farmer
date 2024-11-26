import { Document } from "mongodb";

type TSeason = "spring" | "summer" | "fall" | "winter" | "year-round";
type TProductType =
  | "vegetable"
  | "fruit"
  | "herb"
  | "root"
  | "legume"
  | "nut"
  | "spice"
  | "other";
type TQuantityType = "lb" | "oz" | "g" | "kg" | "unit" | "pack";
interface IQuantityType {
  price: number; // double
  type: TQuantityType;
  quantity: number; // int
  discount?: number; // int, 0-100
}
interface INutrition {
  calories?: number; // double
  protein?: number; // double
  fat?: number; // double
  carbohydrates?: number; // double
  fiber?: number; // double
  vitamins?: string[]; // array of strings
  minerals?: string[]; // array of strings
}
export interface IProductDocumant extends Document {
  name: string; // required
  imgsUrl?: string[]; // array of strings
  family?: string; // string
  season?: TSeason; // enum
  productType: TProductType; // required
  subProductType?: string; // string
  description?: string; // string
  rating?: number; // int, 0-5
  quantityType?: IQuantityType[]; // array of objects
  nutrition?: INutrition; // nested object
}
export interface IUserDocumant extends Document {
  firstName: string; // required
  lastName: string; // required
  email: string; // required
  passwordHash?: string | null;
  googleId?: string | null;
  imgUrl?: string;
}
