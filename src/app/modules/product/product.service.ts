import { startSession } from "mongoose";
import { IProduct } from "./product.interface";
import productModel from "./product.model";
import AppError from "../../errors/app.error";
import { StatusCodes } from "http-status-codes";
import CategoryModel from "../category/category.model";

const createProduct = async (productData: IProduct): Promise<IProduct> => {
  const session = await startSession();

  try {
    session.startTransaction();
    const { name, description, price, stock, categories, image } = productData;
    const products = await productModel.find();
    const conflicted = products.filter((pr) => pr.name === name);
    if (conflicted.length > 0) {
      throw new AppError(StatusCodes.CONFLICT, "Products Already Exists");
    }
    const product = await productModel.create(
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
    session.endSession;
  }
};

export const productServices = {
  createProduct,
};
