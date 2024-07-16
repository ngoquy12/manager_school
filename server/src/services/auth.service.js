const { hashPassword } = require("../utils/hashPassword");
const pool = require("../config/database");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Đăng ký tài khoản cho các admin
module.exports.register = async (req) => {
  const {
    FullName,
    Email,
    Role,
    Permissions,
    CreatedBy,
    Avatar,
    PhoneNumber,
    Password,
  } = req;
  const hashPass = hashPassword(Password);
  const queryString = "CALL Proc_auth_register(?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const [result] = await pool.execute(queryString, [
    uuid(),
    FullName,
    Email,
    Role,
    Avatar,
    hashPass,
    PhoneNumber,
    Permissions,
    CreatedBy,
  ]);

  return result;
};

// Tìm kiếm thông tin một tài khoản theo email
module.exports.findAccountByEmail = async (email) => {
  const queryString = "CALL Proc_auth_findOneByEmail(?)";
  const [[[result]]] = await pool.execute(queryString, [email]);
  return result;
};

// Hàm tạo access token
const generateAccessToken = (account) => {
  return jwt.sign(account, process.env.SECRET_KEY, { expiresIn: "1d" }); // Token hết hạn sau 15 phút
};

// Hàm tạo refresh token
const generateRefreshToken = (account) => {
  return jwt.sign(account, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "365d",
  });
};

// Lấy dữ liệu trong database thực hiện chức năng đăng nhập
module.exports.login = async (req) => {
  const { Email, Password } = req;

  const account = await this.findAccountByEmail(Email);

  if (account) {
    const resultCompare = bcrypt.compareSync(Password, account.Password);

    if (resultCompare) {
      // Tạo đối tượng chứa thông tin của tài khoản đang đăng nhập
      const accountInfo = {
        id: account.AccountId,
        fullName: account.FullName,
        email: account.Email,
        avatar: account.Avatar,
      };

      // Tạo token chứa thông tin của tài khoản đăng nhập
      const accessToken = generateAccessToken(accountInfo);

      // Tạo refresh token thông tin của tài khoản đăng nhập
      const refreshToken = generateRefreshToken(accountInfo);

      return { accessToken, refreshToken };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports.refreshtoken = (token) => {
  const newAccessToken = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

  if (!newAccessToken) {
    throw "Bạn cần đăng nhập";
  } else {
    delete newAccessToken.exp;
    const access_token = generateAccessToken(newAccessToken);
    return access_token;
  }
};
