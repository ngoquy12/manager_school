const { formatDate } = require("./formatData");

module.exports.checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

module.exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Kiểm tra ngày sinh có lớn hơn ngày hiện taị
 * @param {*} dateOfBirth
 * @returns
 */
module.exports.checkDateOfBirthIsMoreNow = (dateOfBirth) => {
  if (formatDate(dateOfBirth) > formatDate(new Date())) {
    return true;
  } else {
    return false;
  }
};
