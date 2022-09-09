import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (
  request: any,
  response: Response,
  next: NextFunction
) => {
  let decodedToken: any = null;
  try {
    let token = request.get("Authorization").split(" ")[1];
    decodedToken = jwt.verify(token, "mysecret");
    request.role = decodedToken.role;
    request.id = decodedToken.id;
    next();
  } catch (error: any) {
    error.message = "Not Authorized";
    error.status = 403;
    next(error);
  }
};

export default auth;