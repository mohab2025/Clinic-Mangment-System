import express, { Request, Response, NextFunction, Router } from "express";

import { searchController } from "../controllers/controllers.module";

const searchRoute = Router();

searchRoute.route("/appointments").get(searchController.getAppointment);
searchRoute.route("/employees").get(searchController.getEmployee);

export default searchRoute;