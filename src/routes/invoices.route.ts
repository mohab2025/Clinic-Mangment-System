import { Router } from "express";

import {
  adminAuth,
  adminAndDoctorAuth,
  allAuth,
} from "../middlewares/userAccess.MW";
import { invoicesController } from "../controllers/controllers.module";
import {
  bodyValidator,
  ParamValidator,
  postValidator,
  putValidator,
} from "../middlewares/invoices.MW";

import auth from "../middlewares/auth.MW";

const router = Router();

router
  .route("/invoices")
  .get(auth, invoicesController.getAllInvoices)
  .post(auth, bodyValidator, postValidator, invoicesController.createInvoices);

router
  .route("/invoices/:id")
  .put(
    auth,
    adminAndDoctorAuth,
    ParamValidator,
    putValidator,
    invoicesController.updateInvoices
  )
  .get(auth, ParamValidator, invoicesController.getoneInvoices)
  .delete(
    auth,
    adminAndDoctorAuth,
    bodyValidator,
    invoicesController.deleteInvoice
  );

export default router;
