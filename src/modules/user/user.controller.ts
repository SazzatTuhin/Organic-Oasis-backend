import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserServices.register(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await UserServices.login(email, password);

    res
      .status(StatusCodes.OK)
      .json({ message: "User logged in successfully", user });
  } catch (error: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
  }
};

export const UserControllers = {
  register,
  login,
};
