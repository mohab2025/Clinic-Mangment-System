import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
const paypal = require("paypal-rest-sdk");

/************ routes */
import employeeRoute from "./routes/employee.route";
import appointmentRoute from "./routes/appointment.route";
import searchRoute from "./routes/search.route";
import paymentRoute from "./routes/payment.route";
import authRoute from "./routes/auth.route";
import toggleRoute from "./routes/toggleRole.route";
import servicesRoute from "./routes/services.route"
import invoicesRoute from "./routes/invoices.route"

import doctorRoutes from "./routes/doctor.route";
import prescriptionRoutes from "./routes/prescription.route";
import patientRoutes from "./routes/patient.route";
import medicinesRoute from "./routes/medicines.route";


paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AatXrjo3Fo6-kb7kFwnnFD5umDluOc6BBZtLSv0xF80IBunZ4hSm9BPMzVyAS72iYPpDFi46ldVE76bv",
  client_secret:
    "ENGE-m5d8p8VYqqKR5yST78w_KtKf4iDpBt_MWHuQKFtnTmev5E1qNcOWznQc8CwYV5CuuYj23YoLvr9",
});
//create server obejct
const app = express();

mongoose
  .connect(process.env.DB_URL || "mongodb://localhost:27017/CMS")
  .then(() => {
    console.log(`DB Connected. ${process.env.DB_URL}`);
    //listen to port number
    app.listen(process.env.PORT || 8080, () => {
      console.log("Listening on localhost:8080");
    });
  })
  .catch((error: Error) => console.log("Db Connection Error " + error));

/****************** MiddleWare *****************/
//1- MW url and method
app.use(morgan("dev")); //method-url-status-ms- :res[content-length]

//2- all users CORS MW
app.use(cors());

/****************** Routes *****************/
app.use(express.json()); //body parsing
app.use(authRoute);
app.use("/payment", paymentRoute);
app.use("/toggleRole", toggleRoute);

app.use(searchRoute);
app.use("/employee", employeeRoute);
app.use("/appointment", appointmentRoute);

app.use("/doctor", doctorRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/patient", patientRoutes);
app.use(medicinesRoute);
app.use(servicesRoute)
app.use(invoicesRoute)

//3- Not Found MW
app.use((request: Request, response: Response) => {
  console.log("Not Found MW");
  response.status(404).json({ message: "Not Found" });
});

//4- Error MW
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.log("Error MW");
    // let errorStatus = (response.status || 500);
    response.status(500).json({ message: "Internal Error:\n" + error });
  }
);
