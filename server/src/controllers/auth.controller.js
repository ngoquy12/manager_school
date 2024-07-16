const { handleResponse } = require("../utils/handleResponse");
const { CREATED, FAILED, SUCCESS } = require("../constants/statusCode");
const { responseMessage } = require("../resources/resourceVN");
const authService = require("../services/auth.service");

// Đăng ký tài khoản
module.exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    if (result.affectedRows > 0) {
      handleResponse(res, CREATED, responseMessage.createSuccess, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

// Đăng nhập tài khoản
module.exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    if (result) {
      handleResponse(res, SUCCESS, responseMessage.loginSuccess, null, result);
    } else {
      handleResponse(res, SUCCESS, responseMessage.infoNotValid, null, null);
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

// Lấy thông tin tài khoản đang đăng nhập
module.exports.getAuthInfo = async (req, res) => {
  try {
    handleResponse(res, SUCCESS, null, null, req.account);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};

// Refresh token
module.exports.refreshtoken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const result = await authService.refreshtoken(token);
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, error, null);
  }
};
