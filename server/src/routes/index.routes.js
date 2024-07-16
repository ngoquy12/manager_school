const express = require("express");
const studentRouter = require("./student.routes");
const classRouter = require("./class.routes");
const authRouter = require("./auth.routes");

const routes = express.Router();

// Ruter xử lý cho đối tượng lớp
routes.use(`/api/v1/Classes`, classRouter);

// Router xử lý cho đối tượng sinh viên
routes.use(`/api/v1/Students`, studentRouter);

// Router xử lý đăng nhập và phân quyền
routes.use(`/api/v1/Auths`, authRouter);

module.exports = routes;
