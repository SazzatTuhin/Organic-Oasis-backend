"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get("/", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.getAllUsers);
router.get("/:userId", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.getAnUser);
router.put("/:userId", (0, auth_middleware_1.default)(user_constant_1.USER_ROLE.user), (0, validation_middleware_1.validate)(user_validation_1.UserValidations.updateUserSchema), user_controller_1.UserControllers.updateAnUser);
router.post("/register", (0, validation_middleware_1.validate)(user_validation_1.UserValidations.registerSchema), user_controller_1.UserControllers.register);
router.post("/login", (0, validation_middleware_1.validate)(user_validation_1.UserValidations.loginSchema), user_controller_1.UserControllers.login);
router.post("/refresh-token", (0, validation_middleware_1.validate)(user_validation_1.UserValidations.refreshTokenSchema), user_controller_1.UserControllers.refreshToken);
exports.default = router;
