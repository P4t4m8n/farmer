"use server";

import { models } from "../mongoose/schema";

export const createAddress = async (address: IAddress) => {
  try {
    const doc = await models.Address.create(address);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateAddress = async (address: IAddress) => {
  try {
    const doc = await models.Address.findByIdAndUpdate(address?._id, address);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAddresses = async (filter: IAddressFIlter) => {
  try {
    const doc = await models.Address.find(filter);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getAddressById = async (id: string) => {
  try {
    const doc = await models.Address.findById(id);
    return doc;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
