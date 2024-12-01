import express, { Router } from "express";
import auth from "../../middlewares/auth.middleware";
import { USER_ROLE } from "../user/user.constant";
import { validate } from "../../middlewares/validation.middleware";
import { ProductValidations } from "./product.validation";
import { productCrontollers } from "./product.controller";

const router: Router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validate(ProductValidations.createProductSchema),
  productCrontollers.createProduct
);

export default router;
