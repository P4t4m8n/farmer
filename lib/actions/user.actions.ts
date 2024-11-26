import { ObjectId } from "mongodb";
import DatabaseService from "../mongo/db";
import { IUserDocumant } from "../mongo/models";
import { AppError } from "../utils/AppError";

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const userCollection = await DatabaseService.getCollection<IUserDocumant>(
      "users"
    );

    const user = await userCollection.findOne<IUser>(
      { _id: new ObjectId(userId) },
      { projection: { passwordHash: 0, googleId: 0 } }
    );
    
    if (!user || !user?._id) {
      throw new Error("User not found");
    }
    
    user._id = user?._id.toString();

    return user;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};
