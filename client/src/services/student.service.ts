import baseUrl from "../api";
import { Student } from "../model/Student";

/**
 * Hiển thị, sắp xếp, phân trang danh sách sinh viên
 * @param debouceValue Giá trị cần tìm kiếm theo tên
 * @param pageSize Số lượng bản ghi trên 1 trang
 * @param currentPage Trang hiện tại
 * @returns Trả về danh sách nhân viên
 * Author: NVQUY (14/06/2024)
 */
const searchAndPaging = (
  debouceValue: string,
  pageSize: number,
  currentPage: number
) => {
  const response = baseUrl.post(
    `Students/search_paging?search=${debouceValue}&pageSize=${pageSize}&pageNumber=${currentPage}`
  );

  return response;
};

/**
 * Gọi API thêm mới sinh viên
 * @param student Dữ liệu của sinh viên lấy từ Form
 * @returns Trả về phản hồi từ server
 * Author: NVQUY (16/06/2024)
 */
const createStudent = async (student: Student) => {
  const response = await baseUrl.post(`Students`, student);

  return response;
};

/**
 * Gọi API xóa thông tin một sinh viên theo Id
 * @param studentId Id của sinh viên cần xóa
 * @returns Trả về phần hồi từ server
 * Author: NVQUY (16/06 )
 */
const deleteStudent = (studentId: string | undefined) => {
  const response = baseUrl.delete(`Students/${studentId}`);
  return response;
};

/**
 * Gọi API lấy thông tin một sinh viên theo id
 * @param studentId Id của sinh viên cần lấy
 * @returns  Thông tin của sinh viên được tìm thấy trong Databas
 * Author: NVQUY (16/06/2024)
 */
const getStudentById = (studentId: string | undefined) => {
  const response = baseUrl.get(`Students/${studentId}`);
  return response;
};

/**
 * Cập nhật thông tin một sinh viên theo id
 * @param studentId  Id của sinh viên cần cập nhật
 * @param student Thông tin mới nhất của sinh viên cần cập nhật
 * @returns Trả về phần hồi từ server
 * Author: NVQUY (16/06/2024)
 */
const updateStudent = (studentId: string | undefined, student: Student) => {
  const response = baseUrl.put(`Students/${studentId}`, student);
  return response;
};

/**
 * Thay đổi trạng thái hoạt động của sinh viên
 * @param studentId Id của sinh viên
 * @returns Trả về phản hồi từ server
 * Author: NVQUY (18/06/2024)
 */
const toggleStatus = async (studentId: string | undefined) => {
  const studentInfo = await getStudentById(studentId);

  studentInfo.data.data.Status = studentInfo.data.data.Status === 1 ? 0 : 1;
  const response = baseUrl.patch(`Students/${studentId}`, {
    Status: studentInfo.data.data.Status,
  });
  return response;
};

/**
 * Xóa nhiều sinh viên theo id
 * @param studentIds Danh sách Id của các sinh viên cần xóa
 * @returns Phản hồi từ server trả về
 * Author: NVQUY (19/06/2024)
 */
const deleteMultiple = (studentIds: string[]) => {
  const response = baseUrl.post("Students/delete-multiple", {
    studentIds: studentIds,
  });

  return response;
};

/**
 * Export danh sách sinh viên
 * @returns Danh sách sinh viên dạng excel và lưu trên máy
 * Author: NVQUY (19/06/2024)
 */
const exportExcel = () => {
  const response = baseUrl.get("Students/export-excel", {
    responseType: "blob",
  });
  return response;
};

/**
 * Import dữ liệu danh sách sinh viên
 * @param formData Dữ liệu lấy từ Form
 * @returns Trạng thái 201 và số lượng bản ghi được thêm vào database
 * Author: NVQUY (19/06/2024)
 */
const importExcel = async (formData: any) => {
  const response = await baseUrl.post("Students/upload-excel", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export {
  searchAndPaging,
  createStudent,
  deleteStudent,
  getStudentById,
  updateStudent,
  toggleStatus,
  deleteMultiple,
  exportExcel,
  importExcel,
};
