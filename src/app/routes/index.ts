import express, { Router } from "express";
import UserRoutes from "../modules/user/user.route";
import categoryRouts from "../modules/category/category.route";
import productRouts from "../modules/product/product.route";

const router: Router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/categories",
    route: categoryRouts,
  },
  {
    path: "/products",
    route: productRouts,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
