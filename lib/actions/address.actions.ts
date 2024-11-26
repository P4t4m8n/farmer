"use server";

import { ObjectId } from "mongodb";
import DatabaseService from "../mongo/db";
import { addressUtil } from "../utils/address.util";
import { AppError } from "../utils/AppError";
import { IAddressDocumant } from "../mongo/models/address.model";

export const getAddresses = async (
  filter: IAddressFIlter
): Promise<IAddress[]> => {
  try {
    const addressCollcation =
      await DatabaseService.getCollection<IAddressDocumant>("addresses");

    const pipeline: Record<string, unknown>[] = [];

    const matchStage: Record<string, unknown> = {};

    if (filter.city) {
      matchStage.city = { $regex: filter.city, $options: "i" };
    }

    if (filter.userId) {
      matchStage.userId = new ObjectId(filter.userId);
    }

    pipeline.push({ $match: matchStage });

    pipeline.push({
      $project: {
        _id: { $toString: "$_id" },
        street: 1,
        city: 1,
        state: 1,
        zipCode: 1,
        country: 1,
        userId: { $toString: "$userId" },
      },
    });

    const addresses = await addressCollcation
      .aggregate<IAddress>(pipeline)
      .toArray();

    if (!addresses || !addresses?.length) {
      AppError.create("No addresses found", 404, true);
      return [];
    }

    return addresses;
  } catch (error) {
    throw AppError.create(`Error getting addresses ${error}`, 500, true);
  }
};

export const saveAddress = async (
  state: unknown,
  formData: FormData
): Promise<IAddress> => {
  try {
    const dto = addressUtil.formDataToDTO(formData);
    const addressCollection =
      await DatabaseService.getCollection<IAddressDocumant>("addresses");

    const { upsertedId } = await addressCollection.updateOne(
      { _id: new ObjectId(dto?._id as string) },
      { $set: dto },
      { upsert: true }
    );

    if (!upsertedId) {
      throw AppError.create("Error saving address", 500, true);
    }

    const address = addressUtil.DTOToAddress({ ...dto, _id: upsertedId });

    return address;
  } catch (error) {
    throw AppError.create(`Error saving address ${error}`, 500, true);
  }
};
