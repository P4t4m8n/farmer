"use server";

import { models } from "../mongoose/schema";

export const createOrder = async (order: IOrder) => {
  try {
    const doc = await models.Order.create(order);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateOrder = async (Order: IOrder) => {
  try {
    const doc = await models.Order.findByIdAndUpdate(Order?._id, Order);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrder = async (filter: IOrderFilter) => {
  try {
    const doc = await models.Order.find(filter);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getOrders = async (id: string) => {
  try {
    const doc = await models.Order.findById(id);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
