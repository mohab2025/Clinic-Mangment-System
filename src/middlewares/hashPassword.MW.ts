import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");

export const hashPassword = (request: Request, response: Response, next: NextFunction) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    bcrypt
      .hash(request.body.password, salt)
      .then(function (hash: string) {
        request.body.password = hash;
        next();
      })
      .catch((error: Error) => next(error));
  });
};
