declare interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addressesId?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
