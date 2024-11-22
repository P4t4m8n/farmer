import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IAddressModel, IOrderModel, IProductModel, IUser } from "./models";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addressesId: [{ type: Schema.Types.ObjectId, ref: "Address" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
      next();
    } catch (err: unknown) {
      next(err as mongoose.CallbackError);
    }
  } else {
    next();
  }
});

const addressSchema: Schema<IAddressModel> = new Schema(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    zipCode: String,
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const orderSchema: Schema<IOrderModel> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        quantityType: {
          type: String,
          required: true,
          enum: ["lb", "oz", "g", "kg", "unit"],
          default: "unit",
        },
      },
    ],
  },
  { timestamps: true }
);

const quantitySchema: Schema<IQuantityType> = new Schema(
  {
    price: { type: Number, required: true, min: 0 },
    type: {
      type: String,
      enum: ["lb", "oz", "g", "kg", "unit"],
      default: "unit",
    },
    quantity: { type: Number, required: true, min: 0 },
    discount: { type: Number, min: 0, max: 100 },
  },
  { _id: false }
);

const nutritionSchema: Schema<INutrition> = new Schema(
  {
    calories: { type: Number, min: 0 },
    protein: { type: Number, min: 0 },
    fat: { type: Number, min: 0 },
    carbohydrates: { type: Number, min: 0 },
    fiber: { type: Number, min: 0 },
    vitamins: [String],
    minerals: [String],
  },
  { _id: false }
);
const productSchema: Schema<IProductModel> = new Schema(
  {
    name: { type: String, required: true, index: true },
    imgsUrl: [String],
    family: String,
    season: {
      type: String,
      enum: ["spring", "summer", "fall", "winter", "year-round"],
      index: true,
    },
    productType: {
      type: String,
      enum: [
        "vegetable",
        "fruit",
        "herb",
        "root",
        "legume",
        "nut",
        "spice",
        "other",
      ],
      index: true,
    },
    subProductType: String,
    description: String,
    rating: { type: Number, min: 0, max: 5, default: 0 },
    quantityType: [quantitySchema],
    nutrition: nutritionSchema,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
const Address =
  mongoose.models.Address ||
  mongoose.model<IAddressModel>("Address", addressSchema);
const Order =
  mongoose.models.Order || mongoose.model<IOrderModel>("Order", orderSchema);
const Product =
  mongoose.models.Product ||
  mongoose.model<IProductModel>("Product", productSchema);

export const models = {
  User,
  Address,
  Order,
  Product,
};
