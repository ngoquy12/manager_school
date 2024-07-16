// Mã trạng thái từ server trả về cho phía client
export const HTTP_CODE = {
  SUCCESS: 200, // Trạng thái thành công (Lấy dữ liệu, cập nhật, xóa)
  CREATED: 201, // Trạng thái thêm mới dữ liệu thành công
  BAD_REQUEST: 400, // Dữ liệu từ người dùng không hợp lệ
  NOT_FOUND: 404, // Dữ liệu không tồn tại
  INTERNAL_SERVER_ERROR: 500, // Lõi hệ thống / máy chủ
  UNAUTHORIZED: 401, // Không có quyền truy cập
};
