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

const login = async (email: string, password: string): Promise<IUser> => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("User with this email does not exist");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Incorrect password");
  }
  return user;
};
export const UserServices = {
  register,
  login,
};
