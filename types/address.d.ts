
declare interface IAddress extends IEntity {
  _id?: string;
  street: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface IAddressFIlter {
  city?: string;
}
