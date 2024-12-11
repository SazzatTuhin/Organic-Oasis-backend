import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;
    const product = await ProductServices.createProduct(productData);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Product created successfully", product });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductServices.getAllProducts();

    res
      .status(StatusCodes.OK)
      .json({ message: "Products retrieved successfully", products });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const product = await ProductServices.getProduct(productId);

    res
      .status(StatusCodes.OK)
      .json({ message: "Product retrieved successfully", product });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProduct,
};
