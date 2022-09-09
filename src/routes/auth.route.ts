import { Router } from "express";

import {
  login,
  oldPassword,
  signUp,
  forgotPassword,
  resetPassword,
} from "../middlewares/authValidation.MW";
import { allAuth } from "../middlewares/userAccess.MW";
import { authController } from "../controllers/controllers.module";
import resultValidator from "../middlewares/validation.MW";
import auth from "../middlewares/auth.MW";

const router = Router();

router
  .route("/login/:userType")
  .post(login, resultValidator, authController.login);

router
  .route("/signUp/:userType")
  .post(signUp, resultValidator, authController.signUp);

router
  .route("/forgotPassword/:userType")
  .post(forgotPassword, resultValidator, authController.forgotPassword);

router
  .route("/resetPassword/:userType/:token")
  .post(resetPassword, resultValidator, authController.resetPassword);

 
  
  router
  .route("/changePassword/:userType")
  .post(
    auth,
    allAuth,
    login,
    oldPassword,
    resultValidator,
    authController.changePassword
  );

export default router;
