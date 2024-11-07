import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";

export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({ req.body});
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const simplifiedErrors = error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));

        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Validation failed", errors: simplifiedErrors });
        return;
      }

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };
};
