import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  username: string;
  name: string;
  email: string;
  password: string;
  image: string;
  address: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}
