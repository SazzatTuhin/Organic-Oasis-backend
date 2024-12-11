import express, { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validation.middleware";
import { USER_ROLE } from "../user/user.constant";
import { ProductControllers } from "./product.controller";
import { ProductValidations } from "./product.validation";

const router: Router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validate(ProductValidations.createProductSchema),
  ProductControllers.createProduct
);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getProduct);

export default router;
