import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import UserModel from "./user.model";

const register = async (userData: IUser): Promise<IUser> => {
  const existingUser = await UserModel.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);

  const user = new UserModel({
    ...userData,
    password: hashedPassword,
  });

  return await user.save();
};

export const UserServices = {
  register,
};
