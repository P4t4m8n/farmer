"use server";

import { redirect } from "next/navigation";
import DatabaseService from "../mongo/db";
import { IOrderDocument } from "../mongo/models/order.model";
import { AppError } from "../utils/AppError";
import { orderUtil } from "../utils/order.util";
import { MongoServerError, ObjectId } from "mongodb";

export const saveOrder = async (state: IOrder, formData: FormData) => {
  let orderId = "";
  try {
    const dto = orderUtil.fromDataToOrderDto(formData, state.products);
    console.log("dto:", dto);
    const orderCollcations =
      await DatabaseService.getCollection<IOrderDocument>("orders");

    const { insertedId } = await orderCollcations.insertOne(dto, {
      writeConcern: { w: "majority", j: true },
    });
    console.log("insertedId:", insertedId);
    if (!insertedId) {
      throw AppError.create("Error saving order", 500, true);
    }
    orderId = insertedId.toString();
    console.log("orderId:", orderId);
  } catch (error) {
    if (error instanceof MongoServerError && error.errInfo) {
      console.error(
        "Validation error details:",
        JSON.stringify(error.errInfo.details, null, 2)
      );
    } else {
      console.error("Full error:", error);
    }
    throw AppError.create(`Error saving order ${error}`, 500, true);
  }

  const URL = `/checkout/payment/${orderId}`;
  redirect(URL);
};

export const getOrderById = async (
  orderId: string
): Promise<Partial<IOrder>> => {
  try {
    const orderCollcations =
      await DatabaseService.getCollection<IOrderDocument>("orders");

    const pipeline: Record<string, unknown>[] = [
      { $match: { _id: new ObjectId(orderId) } },
    ];

    pipeline.push({
      $lookup: {
        from: "addresses",
        localField: "addressId",
        foreignField: "_id",
        as: "address",
      },
    });

    pipeline.push({
      $unwind: {
        path: "$address",
        preserveNullAndEmptyArrays: true,
      },
    });

    pipeline.push({
      $project: {
        _id: { $toString: "$_id" },
        productsPrice: 1,
        deliveryPrice: 1,
        deliveryDate: 1,
        payment: 1,
        status: 1,
        userDetails: 1,
        address: {
          city: 1,
          street: 1,
        },
      },
    });

    const order = await orderCollcations
      .aggregate<Partial<IOrder>>(pipeline)
      .next();

    if (!order) {
      throw AppError.create(`Order not found`, 404, true);
    }

    return order;
  } catch (error) {
    console.error("Full error:", error);
    throw AppError.create(`Error getting order by id ${error}`, 500, true);
  }
};

export const chargeCreditCard = async (
  state: unknown,
  formData: FormData
): Promise<IOrderPayment> => {
  console.log("formData:", formData)
  let url = "/checkout/success";
  try {
    const CC = orderUtil.formDataToCreditCard(formData);
    const orderPayment: IOrderPayment = {
      authNum: Math.random().toString(36).substring(7),
      type: "credit card",
      lastDigits: CC.cardNumber.slice(-4),
      paymentDate: new Date(),
      email: CC.cardHolder,
      paymentName: CC.cardHolder,
      status: "approved",
    };
    const orderId = new ObjectId(CC.orderId);
    const orderCollcations =
      await DatabaseService.getCollection<IOrderDocument>("orders");

    const order = await orderCollcations.findOneAndUpdate(
      { _id: orderId },
      { $set: { payment: orderPayment } }
    );
    console.log("order:", order)

    const deliveryDate = order?.delivryDate;

    url = `/checkout/success?orderId=${CC.orderId}&deliveryDate=${deliveryDate}`;

  } catch (error) {
    throw AppError.create(`Error charging credit card ${error}`, 500, true);
  }

  redirect(url);
};
