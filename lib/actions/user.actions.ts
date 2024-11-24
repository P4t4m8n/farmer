import { ObjectId } from "mongodb";
import DatabaseService from "../mongo/db";
import { IUserDocumant } from "../mongo/models";
import { AppError } from "../utils/AppError";

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const userCollection = await DatabaseService.getCollection<IUserDocumant>(
      "users"
    );

    const userDocumant = await userCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );

    if (!userDocumant) {
      throw new Error("User not found");
    }

    const user: IUser = {
      lastName: userDocumant.lastName,
      firstName: userDocumant.firstName,
      email: userDocumant.email,
      imgUrl: userDocumant.imgUrl,
    };

    return user;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};
