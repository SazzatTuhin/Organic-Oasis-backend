import { StatusCodes } from "http-status-codes";
import { productServices } from "./product.service";
import { Request, Response } from "express";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;
    const product = await productServices.createProduct(productData);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Product created successfully", product });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const productCrontollers = {
  createProduct,
};
