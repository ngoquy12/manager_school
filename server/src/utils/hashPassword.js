const bcrypt = require("bcrypt");

/**
 * Mã hóa mật khẩu
 * @param {*} password Chuỗi mật khẩu cần mã hóa
 * @param {*} saltRounds Số vòng xử lý chuỗi mật khẩu
 * @returns Chuỗi mật khẩu đã được mã hóa
 */
module.exports.hashPassword = (password, saltRounds = 10) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};
