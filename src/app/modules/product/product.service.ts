import { StatusCodes } from "http-status-codes";
import { startSession } from "mongoose";
import AppError from "../../errors/app.error";
import CategoryModel from "../category/category.model";
import { IProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProduct = async (productData: IProduct): Promise<IProduct> => {
  const session = await startSession();

  try {
    session.startTransaction();

    const { name, description, price, stock, categories, image } = productData;

    const products = await ProductModel.find();
    const conflicted = products.filter((pr) => pr.name === name);

    if (conflicted.length > 0) {
      throw new AppError(StatusCodes.CONFLICT, "Product already exists");
    }

    const product = await ProductModel.create(
      [{ name, description, price, stock, categories, image }],
      { session }
    );

    await CategoryModel.updateMany(
      { _id: { $in: categories } },
      { $push: { products: product[0]._id } },
      { session }
    );

    await session.commitTransaction();
    return (await product[0].populate("categories")).toObject();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllProducts = async (): Promise<IProduct[]> => {
  const products = await ProductModel.find().populate("categories");
  return products;
};

const getProduct = async (productId: string): Promise<IProduct> => {
  const product = await ProductModel.findById(productId).populate("categories");

  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  return product;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProduct,
};
