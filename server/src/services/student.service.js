const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const ExcelJS = require("exceljs");
const fs = require("fs");
const moment = require("moment");
const XLSX = require("xlsx");
const { FAILED, CREATED } = require("../constants/statusCode");
const { responseMessage, field } = require("../resources/resourceVN");
const { handleResponse } = require("../utils/handleResponse");

module.exports.findAll = async () => {
  const queryString = "CALL Proc_student_findAll()";
  const [[result]] = await pool.execute(queryString);
  return result;
};

module.exports.searchAndPaging = async (query) => {
  const queryString = "CALL Proc_student_searchAndPaging(?, ?, ?)";
  const { search, pageSize, pageNumber } = query;
  const [result] = await pool.execute(queryString, [
    search,
    pageSize,
    pageNumber,
  ]);

  // Tổng số bản ghi tìm thấythấy
  const totalResult = result[0][0].count;
  // Tính tổng số trang
  const totalPage = Math.ceil(totalResult / pageSize);

  const pagingResult = {
    students: result[1],
    totalResults: totalResult,
    totalPage: totalPage,
  };

  return pagingResult;
};

module.exports.findOne = async (studentId) => {
  const queryString = "CALL Proc_student_findOne(?)";
  const [[[result]]] = await pool.execute(queryString, [studentId]);
  return result;
};

module.exports.remove = async (studentId) => {
  const queryString = "CALL Proc_student_remove(?)";
  const [result] = await pool.execute(queryString, [studentId]);
  return result;
};

module.exports.deleteMultiple = async (studentIds) => {
  try {
    await pool.beginTransaction();

    const studentIdsStr = studentIds.map((id) => `'${id}'`).join(",");

    const queryString = "CALL Proc_student_deleteMutiple(?)";

    const [result] = await pool.execute(queryString, [studentIdsStr]);

    await pool.commit();

    return result;
  } catch (error) {
    await pool.rollback();
  }
};

module.exports.create = async (studentObj) => {
  const {
    StudentCode,
    StudentName,
    Gender,
    DateOfBirth,
    Email,
    PhoneNumber,
    Address,
    Avatar,
    ClassId,
    CreatedBy,
  } = studentObj;
  const queryString =
    "CALL Proc_student_create(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const [result] = await pool.execute(queryString, [
    uuidv4(),
    StudentCode,
    StudentName,
    Gender,
    DateOfBirth,
    Email,
    PhoneNumber,
    Address,
    Avatar,
    ClassId,
    CreatedBy,
  ]);

  return result;
};

module.exports.uploadExcel = async (req, res) => {
  try {
    const excelFile = req.files.file;
    const MIMETYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (excelFile.mimetype !== MIMETYPE) {
      fs.unlinkSync(excelFile.tempFilePath);
    } else {
      const workbook = XLSX.readFile(excelFile.tempFilePath);
      const sheetName = workbook.SheetNames[0];
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const successData = [];
      const failedData = [];

      for (let i = 0; i < data.length; i++) {
        let {
          StudentCode,
          StudentName,
          Gender,
          DateOfBirth,
          Email,
          PhoneNumber,
          Address,
          Avatar,
          ClassId,
          CreatedBy,
        } = data[i];

        // Chuyển đổi định dạng ngày tháng từ số ngày trong Excel
        if (DateOfBirth) {
          DateOfBirth = moment(
            new Date((DateOfBirth - (25567 + 2)) * 86400 * 1000)
          ).format("YYYY/MM/DD");
        }

        const queryString =
          "CALL Proc_student_create(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const result = await pool.query(queryString, [
          uuidv4(),
          StudentCode,
          StudentName,
          Gender,
          DateOfBirth,
          Email,
          PhoneNumber,
          Address,
          Avatar,
          ClassId,
          CreatedBy,
        ]);

        if (result[0].affectedRows) {
          successData.push(data[i]);
        } else {
          failedData.push(data[i]);
        }
      }
      fs.unlinkSync(excelFile.tempFilePath);
      handleResponse(
        res,
        CREATED,
        `${responseMessage.created} ${data.length} ${field.record}`,
        null
      );
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.findStudentByCode = async (studentCode, studentId) => {
  let queryString;
  let queryParams;

  if (!studentId) {
    queryString = "CALL Proc_student_checkDuplicateStudentCode(?)";
    queryParams = [studentCode];
  } else {
    queryString = "CALL Proc_student_CheckDuplicateStudentCodeById(?, ?)";
    queryParams = [studentCode, studentId];
  }

  const [rows] = await pool.execute(queryString, queryParams);
  const result = rows[0][0];
  return result;
};

module.exports.findStudentByEmail = async (email) => {
  const queryString = "CALL Proc_student_findOneByEmail(?)";
  const [[[result]]] = await pool.execute(queryString, [email]);
  return result;
};

module.exports.checkDuplicateEmail = async (email, studentId) => {
  let queryString;
  let queryParams;

  if (!studentId) {
    queryString = "CALL Proc_student_checkDuplicateEmail(?)";
    queryParams = [email];
  } else {
    queryString = "CALL Proc_student_checkDuplicateEmailById(?, ?)";
    queryParams = [email, studentId];
  }

  const [rows] = await pool.execute(queryString, queryParams);
  const result = rows[0][0];
  return result;
};

module.exports.update = async (studentId, studentObj) => {
  const {
    StudentCode,
    StudentName,
    Gender,
    DateOfBirth,
    Email,
    PhoneNumber,
    Address,
    Avatar,
    ClassId,
    ModifiedBy,
  } = studentObj;
  const queryString =
    "CALL Proc_student_update(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const [result] = await pool.execute(queryString, [
    StudentCode,
    StudentName,
    Gender,
    DateOfBirth,
    Email,
    PhoneNumber,
    Address,
    Avatar,
    ClassId,
    ModifiedBy,
    studentId,
  ]);

  return result;
};

module.exports.updateStatus = async (studentId, status) => {
  const queryString = "CALL Proc_student_toggleStatus(?, ?)";

  const [result] = await pool.execute(queryString, [studentId, status]);

  return result;
};

module.exports.exportExcel = async (res) => {
  const queryString = "CALL Proc_student_findAll()";

  try {
    const [[results]] = await pool.execute(queryString);

    if (results.length === 0) {
      res.status(404).send("Không tìm thấy dữ liệu.");
      return;
    }

    // Tạo workbook và worksheet mới
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Manager Student", {
      headerFooter: "Danh sách sinh viên",
    });

    // Thiết lập các cột cho worksheet
    worksheet.columns = [
      { header: "StudentCode", key: "StudentCode", width: 20 },
      { header: "StudentName", key: "StudentName", width: 25 },
      { header: "Gender", key: "Gender", width: 25 },
      { header: "DateOfBirth", key: "DateOfBirth", width: 15 },
      { header: "Email", key: "Email", width: 25 },
      { header: "Address", key: "Address", width: 30 },
      { header: "Status", key: "Status", width: 10 },
      { header: "PhoneNumber", key: "PhoneNumber", width: 15 },
      { header: "ClassName", key: "ClassName", width: 15 },
    ];

    // Thêm dữ liệu vào worksheet
    results.forEach((row) => {
      worksheet.addRow(row);
    });

    // Define border style
    const borderStyles = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // Apply borders to all cells
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = borderStyles;
      });
    });

    // Thiết lập tiêu đề và kiểu nội dung cho phản hồi
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ListStudent.xlsx"
    );

    // Ghi workbook vào response
    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (err) {
    res.status(500).send("Lỗi khi truy vấn hoặc xuất dữ liệu.");
  }
};
