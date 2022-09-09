import { Router } from "express";
import {
  bodyValidator,
  ParamValidator,
  postValidator,
  putValidator,
} from "../middlewares/services.MW";

import {
  adminAuth,
  adminAndDoctorAuth,
  allAuth,
} from "../middlewares/userAccess.MW";
import { servicesController } from "../controllers/controllers.module";

import auth from "../middlewares/auth.MW";

const router = Router();

router.use(auth);

router
  .route("/services")
  .get(auth, servicesController.getAllService)
  .post(
    auth,
    adminAndDoctorAuth,
    bodyValidator,
    postValidator,
    servicesController.createService
  );

router
  .route("/services/:id")
  .put(
    auth,
    adminAndDoctorAuth,
    ParamValidator,
    putValidator,
    servicesController.updateService
  )
  .get(auth, ParamValidator, servicesController.getServiceById)
  .delete(
    auth,
    adminAndDoctorAuth,
    bodyValidator,
    servicesController.deleteService
  );

export default router;
