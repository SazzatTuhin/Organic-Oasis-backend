import express, { Router } from "express";
import { UserCcontrollers } from "./user.controller";

const router: Router = express.Router();

router.post("/register", UserCcontrollers.register);

export default router;
