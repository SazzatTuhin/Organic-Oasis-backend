"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const validate = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.parseAsync(Object.assign(Object.assign({}, req.body), req.cookies));
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const simplifiedErrors = error.errors.map((err) => ({
                    field: err.path[0],
                    message: err.message,
                }));
                res
                    .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                    .json({ message: "Validation failed", errors: simplifiedErrors });
                return;
            }
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal server error" });
        }
    });
};
exports.validate = validate;
