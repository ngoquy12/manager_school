const express = require("express");
const authController = require("../controllers/auth.controller");
const {
  checkEmailIsExit,
  checkAuthInfoIsEmpty,
  authenticateToken,
  checkLoginIsEmpty,
} = require("../middlewares/auth.middleware");

const authRouter = express.Router();

// Router đăng ký tài khoản admin
authRouter.post(
  "/register",
  checkAuthInfoIsEmpty,
  checkEmailIsExit,
  authController.register
);

// Router đăng nhập tài khoản
authRouter.post("/login", checkLoginIsEmpty, authController.login);

// Router lấy thông tin tài khoản đăng nhập
authRouter.get("/get-info", authenticateToken, authController.getAuthInfo);

// Router refresh token
authRouter.get(
  "/refresh-token",
  // authenticateToken,
  authController.refreshtoken
);

authRouter.put("/change-password");
module.exports = authRouter;
