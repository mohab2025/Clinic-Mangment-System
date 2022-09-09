import { Router } from "express";

import { put, idValidator } from "../middlewares/doctor.MW";
import {
  adminAuth,
  adminAndDoctorAuth,
  allAuth,
} from "../middlewares/userAccess.MW";
import { doctorController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth from "../middlewares/auth.MW";

const router = Router();

router.use(auth);

router.route("/").get(allAuth, doctorController.getAllDoctors);

router
  .route("/:id")
  .put(adminAndDoctorAuth, put, resultValidator, doctorController.updateDoctor)
  .all(idValidator, resultValidator)
  .get(allAuth, doctorController.getDoctor)
  .delete(adminAuth, doctorController.deleteDoctor);

export default router;
