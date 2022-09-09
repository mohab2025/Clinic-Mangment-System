import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export default function resultValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let result: any = validationResult(request);
  if (!result.isEmpty()) {
    let message = result.errors.reduce(
      (current: String, error: any) => current + error.msg + " ",
      ""
    );
    let error: any = new Error(message);
    error.status = 422;
    next(error);
  } else {
    next();
  }
}
