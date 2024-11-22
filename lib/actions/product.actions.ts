"use server";

import { models } from "../mongoose/schema";

export const createProduct = async (product: IProduct) => {
  try {
    const doc = await models.Product.create(product);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateProduct = async (product: IProduct) => {
  try {
    const doc = await models.Product.findByIdAndUpdate(product?._id, product);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProducts = async (
  filter: IProductFIlter,
  skip = 0,
  limit = 100
) => {
  try {
    const docs = await models.Product.find(filter)
      .skip(skip)
      .limit(limit)
      .lean<IProduct[]>();
    return docs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getProductById = async (id: string) => {
  try {
    const doc = await models.Product.findById(id);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
