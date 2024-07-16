const {
  SUCCESS,
  FAILED,
  CREATED,
  BAD_REQUEST,
} = require("../constants/statusCode");
const { responseMessage } = require("../resources/resourceVN");
const studentService = require("../services/student.service");
const { handleResponse } = require("../utils/handleResponse");

module.exports.findAll = async (req, res) => {
  try {
    const result = await studentService.findAll();

    handleResponse(res, SUCCESS, null, null, result);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.searchAndPaging = async (req, res) => {
  try {
    const result = await studentService.searchAndPaging(req.query);

    handleResponse(res, SUCCESS, null, null, result);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const result = await studentService.findAll();

    handleResponse(res, SUCCESS, null, null, result);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.findOne = async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await studentService.findOne(studentId);

    handleResponse(res, SUCCESS, null, null, result);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.remove = async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await studentService.remove(studentId);

    if (result.affectedRows > 0) {
      handleResponse(res, SUCCESS, responseMessage.deleteSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.deleteMultiple = async (req, res) => {
  const { studentIds } = req.body;
  try {
    if (!Array.isArray(studentIds) || studentIds.length === 0) {
      handleResponse(res, BAD_REQUEST, responseMessage.dataNotValid, null);
    }

    const result = await studentService.deleteMultiple(studentIds);
    if (result) {
      handleResponse(res, SUCCESS, responseMessage.deleteSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.create = async (req, res) => {
  try {
    const result = await studentService.create(req.body);

    if (result.affectedRows > 0) {
      handleResponse(res, CREATED, responseMessage.createSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.uploadExcel = async (req, res) => {
  try {
    await studentService.uploadExcel(req, res);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.exportExcel = async (req, res) => {
  try {
    await studentService.exportExcel(res);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.update = async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await studentService.update(studentId, req.body);

    if (result.affectedRows > 0) {
      handleResponse(res, SUCCESS, responseMessage.updateSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.updateStatus = async (req, res) => {
  const { studentId } = req.params;
  const { Status } = req.body;
  try {
    const result = await studentService.updateStatus(studentId, Status);

    if (result.affectedRows > 0) {
      handleResponse(res, SUCCESS, responseMessage.updateSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};
