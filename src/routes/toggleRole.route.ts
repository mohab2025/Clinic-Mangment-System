import { Router } from "express";

import { idValidator } from "../middlewares/doctor.MW";
import { adminAuth } from "../middlewares/userAccess.MW";
import { toggleRoleController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth from "../middlewares/auth.MW";

const router = Router();

router.use(auth, adminAuth, idValidator, resultValidator);

router.route("/:userType").post(toggleRoleController.toggleRole);

export default router;
