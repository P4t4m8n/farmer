"use server";

import { models } from "../mongoose/schema";

export const createProduct = async (product: IProduct): Promise<IProduct> => {
  try {
    const doc = await models.Product.create(product);
    return { ...doc, _id: doc?._id.toString() };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateProduct = async (product: IProduct) => {
  try {
    const doc = await models.Product.findByIdAndUpdate(product?._id, product);
    return { ...doc, _id: doc?._id.toString() };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProduct = async (filter: IProductFIlter) => {
  try {
    const doc = await models.Product.find(filter);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getProducts = async (id: string) => {
  try {
    const doc = await models.Product.findById(id);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
