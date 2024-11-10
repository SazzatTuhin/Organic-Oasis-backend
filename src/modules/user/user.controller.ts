import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { UserServices } from "./user.service";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accessToken, refreshToken } = await UserServices.register(req.body);

    res.cookie("refreshToken", refreshToken, {
      secure: config.node_env === "production",
      httpOnly: true,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully", accessToken });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await UserServices.login(
      email,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      secure: config.node_env === "production",
      httpOnly: true,
    });

    res
      .status(StatusCodes.OK)
      .json({ message: "User logged in successfully", accessToken });
  } catch (error: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
  }
};

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.cookies;
  const { accessToken } = await UserServices.refreshToken(refreshToken);

  res
    .status(StatusCodes.OK)
    .json({ message: "Access token retrieved successfully", accessToken });
};

export const UserControllers = {
  register,
  login,
  refreshToken,
};
