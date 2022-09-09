import { Router } from "express";

import {
  post,
  put,
  idValidator,
  addServices,
  removeServices,
  partPayment,
} from "../middlewares/patient.MW";
import {
  patientController,
  invoicesController,
} from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth from "../middlewares/auth.MW";
import {
  doctorAndEmployeeAuth,
  adminAuth,
  adminAndEmployeeAuth,
} from "../middlewares/userAccess.MW";
import { postValidator } from "../middlewares/invoices.MW";

const router = Router();

router.use(auth);

router
  .route("/")
  .post(
    adminAndEmployeeAuth,
    post,
    resultValidator,
    patientController.createPatient
  )
  .get(adminAndEmployeeAuth, patientController.getAllPatients);

router
  .route("/partPayment")
  .put(
    adminAndEmployeeAuth,
    partPayment,
    resultValidator,
    patientController.partPayment,
    invoicesController.updateIsReady
  );

router
  .route("/:id")
  .all(idValidator, resultValidator)
  .put(
    adminAndEmployeeAuth,
    put,
    resultValidator,
    patientController.updatePatient
  )
  .get(doctorAndEmployeeAuth, patientController.getPatient)
  .delete(adminAuth, patientController.deletePatient);

router
  .route("/:id/addService")
  .put(
    adminAndEmployeeAuth,
    idValidator,
    postValidator,
    resultValidator,
    patientController.addServicePatient,
    invoicesController.createInvoices
  );

router
  .route("/:id/removeService")
  .put(
    adminAndEmployeeAuth,
    idValidator,
    removeServices,
    resultValidator,
    patientController.removeServicePatient
  );

export default router;
