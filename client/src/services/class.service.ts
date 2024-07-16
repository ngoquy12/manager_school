import baseUrl from "../api";

// Lấy danh sách tất cả lớp học
export const findAllClass = () => {
  const result = baseUrl.get("Classes");

  return result;
};
