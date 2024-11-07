import { validate } from "./../../middlewares/validation.middleware";
import express, { Router } from "express";
import { UserControllers } from "./user.controller";
import { UserValidations } from "./user.validation";

const router: Router = express.Router();

router.post(
  "/register",
  validate(UserValidations.registerSchema),
  UserControllers.register
);
router.post(
  "/login",
  validate(UserValidations.loginSchema),
  UserControllers.login
);

export default router;
