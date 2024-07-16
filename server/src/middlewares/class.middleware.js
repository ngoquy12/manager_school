const { BAD_REQUEST, FAILED } = require("../constants/statusCode");
const { clientError, responseMessage } = require("../resources/resourceVN");
const { findClassByName } = require("../services/class.service");
const { handleResponse } = require("../utils/handleResponse");
const { checkIsEmpty } = require("../utils/validateData");

module.exports.checkClassNameIsEmpty = (req, res, next) => {
  const { ClassName } = req.body;

  if (checkIsEmpty(ClassName)) {
    handleResponse(res, BAD_REQUEST, clientError.classNameNotEmpty, null, null);
  } else {
    next();
  }
};

module.exports.checkClassNameIsExit = async (req, res, next) => {
  const { ClassName } = req.body;

  try {
    const result = await findClassByName(ClassName);

    if (result) {
      handleResponse(
        res,
        BAD_REQUEST,
        clientError.classNameNotExits,
        null,
        null
      );
    } else {
      next();
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, null, null);
  }
};
