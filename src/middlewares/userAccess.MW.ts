import { RequestHandler } from "express";

export const adminAuth: RequestHandler = (request: any, response, next) => {
  if (request.role == "admin") {
    next();
  } else {
    let error: any = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

export const doctorAuth: RequestHandler = (request: any, response, next) => {
  if (request.role == "doctor") {
    next();
  } else {
    let error: any = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

export const employeeAuth: RequestHandler = (request: any, response, next) => {
  if (request.role == "employee") {
    next();
  } else {
    let error: any = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

export const adminAndEmployeeAuth: RequestHandler = (
  request: any,
  response,
  next
) => {
  if (["admin", "employee"].includes(request.role)) {
    next();
  } else {
    let error: any = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

export const doctorAndEmployeeAuth: RequestHandler = (
  request: any,
  response,
  next
) => {
  if (["employee", "doctor"].includes(request.role)) {
    next();
  } else {
    let error: any = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

export const adminAndDoctorAuth: RequestHandler = (
  request: any,
  response,
  next
) => {
  if (["admin", "doctor"].includes(request.role)) {
    next();
  } else {
    let error: any = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

export const allAuth: RequestHandler = (request: any, response, next) => {
  if (["admin", "doctor", "employee"].includes(request.role)) {
    next();
  } else {
    let error: any = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};
