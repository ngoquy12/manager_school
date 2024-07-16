const { BAD_REQUEST, FAILED } = require("../constants/statusCode");
const { clientError, responseMessage } = require("../resources/resourceVN");
const { findClassByName } = require("../services/class.service");
const {
  findStudentByCode,
  findStudentByEmail,
  checkDuplicateEmail,
} = require("../services/student.service");
const { handleResponse } = require("../utils/handleResponse");
const {
  checkIsEmpty,
  validateEmail,
  checkDateOfBirthIsMoreNow,
} = require("../utils/validateData");

module.exports.checkStudentInfoIsEmpty = (req, res, next) => {
  const { StudentCode, StudentName, DateOfBirth, Email, ClassId } = req.body;

  if (checkIsEmpty(StudentCode)) {
    handleResponse(
      res,
      BAD_REQUEST,
      clientError.studentCodeNotEmpty,
      null,
      null
    );
  }

  if (checkIsEmpty(StudentName)) {
    handleResponse(
      res,
      BAD_REQUEST,
      clientError.studentNameNotEmpty,
      null,
      null
    );
  }

  if (checkIsEmpty(Email)) {
    handleResponse(res, BAD_REQUEST, clientError.EmailNotEmpty, null, null);
  }

  if (checkIsEmpty(ClassId)) {
    handleResponse(res, BAD_REQUEST, clientError.classNameNotEmpty, null, null);
  }

  if (!validateEmail(Email)) {
    handleResponse(res, BAD_REQUEST, clientError.emailNotValid, null, null);
  }

  if (checkDateOfBirthIsMoreNow(DateOfBirth)) {
    handleResponse(
      res,
      BAD_REQUEST,
      clientError.dateOfBirthNotMoreNow,
      null,
      null
    );
  }

  next();
};

module.exports.checkStudentCodeIsExit = async (req, res, next) => {
  const { StudentCode } = req.body;
  const { studentId } = req.params;

  try {
    const result = await findStudentByCode(StudentCode, studentId);

    if (result) {
      handleResponse(
        res,
        BAD_REQUEST,
        clientError.studentCodeExits,
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

module.exports.checkEmailIsExit = async (req, res, next) => {
  const { Email } = req.body;
  const { studentId } = req.params;

  try {
    const result = await checkDuplicateEmail(Email, studentId);

    if (result) {
      handleResponse(res, BAD_REQUEST, clientError.emailExited, null, null);
    } else {
      next();
    }
  } catch (error) {
    handleResponse(res, FAILED, responseMessage.serverError, null, null);
  }
};
