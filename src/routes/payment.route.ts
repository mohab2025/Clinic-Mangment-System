import express from "express";
import validationMW from "../middlewares/validation.MW";
import { paymentController } from "../controllers/controllers.module";

const paymentRouter = express.Router();

paymentRouter.route("/").post(paymentController.pay);
paymentRouter.route("/success").get(paymentController.paymentCompleted);
paymentRouter.route("/cancel").get(paymentController.paymentCancelled);

export default paymentRouter;
