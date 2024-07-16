const express = require("express");
const classController = require("../controllers/class.controller");
const {
  checkClassNameIsEmpty,
  checkClassNameIsExit,
} = require("../middlewares/class.middleware");

const classRouter = express.Router();

// Router lấy thông tin tất cả lớp học
classRouter.get("/", classController.findAll);

// Router lấy thông tin tất cả lớp học theo id
classRouter.get("/:classId", classController.findOne);

// Router xóa thông tin một lớp học theo id
classRouter.delete("/:classId", classController.remove);

// Router thêm mới lớp học
classRouter.post(
  "/",
  checkClassNameIsEmpty,
  checkClassNameIsExit,
  classController.create
);

// Router cập nhật thông tin một lớp học theo id
classRouter.put("/:classId", checkClassNameIsEmpty, classController.update);

module.exports = classRouter;
