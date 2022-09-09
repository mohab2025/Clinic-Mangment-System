import { Request, Response, NextFunction } from "express";

import Employee from "../models/employee.model";
import Appointment from "../models/appointment.model";

interface IQuery {
  [key: string]: any;
}

export default class FilterAppointmentController {
  /** Appointment filters:
   * by date
   * by doctor ? get by doctor
   * by employee ? get by employee
   */
  getAppointment = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const queries = this.handleFilterQuery(request.query);
    Appointment.find(queries![0])
      .sort(queries![1])
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  };

  /** Employee filters:
   * by department
   */
  getEmployee = (request: Request, response: Response, next: NextFunction) => {
    const queries = this.handleFilterQuery(request.query);
    if (queries!.length) {
     Employee.find(queries![0], {password: 0})
       .sort(queries![1])
       .then((data) => {
         response.status(200).json(data);
       })
       .catch((error) => {
         next(error);
       }); 
    }
  };

  handleFilterQuery = (queryObject: IQuery) => {
    if (queryObject) {
      let filterQuery: IQuery;
      let sortQuery: IQuery;
      filterQuery = {};
      sortQuery = {};
      for (let key in queryObject) {
        if (queryObject[key] && key !== "key") {
          filterQuery[key] = queryObject[key];
        } else if (key === "key") {
          if (typeof key === "string") sortQuery[queryObject.key] = 1;
          else {
            for (let sortKey of queryObject.key) {
              sortQuery[sortKey] = 1;
            }
          }
        }
      }
      return [filterQuery, sortQuery];
    }
  };
}

