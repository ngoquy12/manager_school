const { SUCCESS, FAILED, CREATED } = require("../constants/statusCode");
const { responseMessage } = require("../resources/resourceVN");
const classService = require("../services/class.service");
const { handleResponse } = require("../utils/handleResponse");

module.exports.findAll = async (req, res) => {
  try {
    const result = await classService.findAll();

    handleResponse(res, SUCCESS, null, null, result);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.findOne = async (req, res) => {
  try {
    const { classId } = req.params;
    const result = await classService.findOne(classId);

    handleResponse(res, SUCCESS, null, null, result);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { classId } = req.params;
    const result = await classService.remove(classId);
    if (result.affectedRows > 0) {
      handleResponse(res, CREATED, responseMessage.deleteSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.create = async (req, res) => {
  try {
    const result = await classService.create(req.body);
    if (result.affectedRows > 0) {
      handleResponse(res, SUCCESS, responseMessage.createSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { classId } = req.params;
    const result = await classService.update(classId, req.body);

    if (result.affectedRows > 0) {
      handleResponse(res, SUCCESS, responseMessage.updateSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};
