/**
 * Kiểm tra định dạng email
 * @param email Chuỗi email cần kiểm tra
 * @returns undefined nếu sai định dạng, data nếu định dạng
 * Author: NVQUY (16/04/2024)
 */
export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Kiểm tra định dạng số điện thoại
 * @param phone Chuỗi số điện cần kiểm tra
 * @returns true nếu đúng định dạng, false nếu sai định dạng
 * Auth: NVQUY (16/04/2024)
 */
export const validatePhoneNumber = (phone: string) => {
  const regexPhoneNumber = /(0|0[3|5|7|8|9])+([0-9]{8})\b/g;

  return phone.match(regexPhoneNumber) ? true : false;
};

/**
 * Kiểm tra định dạng mã sinh viên có bắt đầu bằng SV và kết thúc là một chuỗi số ?
 * @param code Chuỗi mã cần kiểm tra
 * @returns True nếu đúng định dạng, false nếu sai định dạng
 */
export const checkFormatStudentCode = (code: string) => {
  if (!code.startsWith("SV")) {
    return false;
  }

  // Lấy ra chuỗi sau ký tự "SV"
  const numericPart = code.slice(2);

  // Kiểm tra xem chuỗi sau ký tự có phải là chuỗi số hay không?
  const isNumeric = /^\d+$/.test(numericPart);

  return isNumeric;
};

/**
 * Kiểm tra giá trị của trường có bị rỗng không?
 * @param field Giá trị của trường cần kiểm tra
 * @returns True nếu giá trị bị rỗng, false nếu trường có giá trị
 * Auth: NVUQY (16/04/2024)
 */
export const checkFieldIsEmpty = (field: string) => {
  if (field === undefined || field === "" || field === null) {
    return true;
  } else {
    false;
  }
};
