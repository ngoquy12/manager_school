const {
  BAD_REQUEST,
  FAILED,
  UNAUTHORIZED,
  FORBIDDEN,
} = require("../constants/statusCode");
const { clientError, responseMessage } = require("../resources/resourceVN");
const { findAccountByEmail } = require("../services/auth.service");
const { handleResponse } = require("../utils/handleResponse");
const { checkIsEmpty, validateEmail } = require("../utils/validateData");
const jwt = require("jsonwebtoken");

module.exports.checkLoginIsEmpty = (req, res, next) => {
  const { Email, Password } = req.body;

  if (checkIsEmpty(Email)) {
    handleResponse(res, BAD_REQUEST, clientError.EmailNotEmpty, null, null);
  }

  if (checkIsEmpty(Password)) {
    handleResponse(res, BAD_REQUEST, clientError.passwordNotEmpty, null, null);
  }

  next();
};

module.exports.checkAuthInfoIsEmpty = (req, res, next) => {
  const { Email, FullName, Password } = req.body;

  if (checkIsEmpty(Email)) {
    handleResponse(res, BAD_REQUEST, clientError.EmailNotEmpty, null, null);
  }

  if (checkIsEmpty(FullName)) {
    handleResponse(res, BAD_REQUEST, clientError.fullNameNotEmpty, null, null);
  }

  if (checkIsEmpty(Password)) {
    handleResponse(res, BAD_REQUEST, clientError.passwordNotEmpty, null, null);
  }

  if (Password.length < 8) {
    handleResponse(res, BAD_REQUEST, clientError.passwordIsLess, null, null);
  }

  if (!validateEmail(Email)) {
    handleResponse(res, BAD_REQUEST, clientError.emailNotValid, null, null);
  }

  next();
};

module.exports.checkEmailIsExit = async (req, res, next) => {
  const { Email } = req.body;

  try {
    const result = await findAccountByEmail(Email);

    if (result) {
      handleResponse(res, BAD_REQUEST, clientError.emailExited, null, null);
    } else {
      next();
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, null, null);
  }
};

// Middleware xác thực JWT
module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    handleResponse(res, UNAUTHORIZED, responseMessage.youNeedToLogin, null);
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, account) => {
      if (err) {
        handleResponse(res, FORBIDDEN, responseMessage.notHaveAccess, null);
      } else {
        req.account = account;
        next();
      }
    });
  }
};
