const express = require("express");
const studentController = require("../controllers/student.controller");
const {
  checkStudentInfoIsEmpty,
  checkStudentCodeIsExit,
  checkEmailIsExit,
} = require("../middlewares/student.middleware");
const fileUpload = require("express-fileupload");
const uploadOptions = require("../utils/uploadExcel");
const { authenticateToken } = require("../middlewares/auth.middleware");

const studentRouter = express.Router();

// Router lấy thông tin tất cả sinh viên
studentRouter.get("/", studentController.findAll);

// Router tìm kiếm, phân trang danh sách sinh viên
studentRouter.post("/search_paging", studentController.searchAndPaging);

// Router xóa thông tin nhiều sinh viên
studentRouter.post("/delete-multiple", studentController.deleteMultiple);

// Router import dữ liệu excel thêm mới sinh viên
studentRouter.post(
  "/upload-excel",
  fileUpload(uploadOptions),
  studentController.uploadExcel
);

// Router export dữ liệu danh sách sinh viên bằng excel
studentRouter.get("/export-excel", studentController.exportExcel);

// Router lấy thông tin một sinh viên theo id
studentRouter.get("/:studentId", studentController.findOne);

// Router xóa thông tin một sinh viên theo id
studentRouter.delete("/:studentId", studentController.remove);

// Router thêm mới thông tin sinh viên
studentRouter.post(
  "/",
  checkStudentInfoIsEmpty,
  checkStudentCodeIsExit,
  checkEmailIsExit,
  studentController.create
);

// Router cập nhật thông tin một sinh viên theo id
studentRouter.put(
  "/:studentId",
  checkStudentInfoIsEmpty,
  checkStudentCodeIsExit,
  checkEmailIsExit,
  studentController.update
);

// Router cập nhật trạng thái hoạt động của sinh viên theo id
studentRouter.patch("/:studentId", studentController.updateStatus);

module.exports = studentRouter;
