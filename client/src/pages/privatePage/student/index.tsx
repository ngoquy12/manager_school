import { useEffect, useRef, useState } from "react";
import Button from "../../../components/base/button";
import Input from "../../../components/base/input";
import "./student.scss";
import { Student } from "../../../model/Student";
import useDebounce from "../../../hooks/useDebounce";
import { SelectType } from "../../../components/base/select/SelectType";
import Select from "../../../components/base/select";
import FormStudent from "../../../components/admin/form/FormStudent";
import Loader from "../../../components/base/loader";
import {
  deleteMultiple,
  deleteStudent,
  exportExcel,
  importExcel,
  searchAndPaging,
  toggleStatus,
} from "../../../services/student.service";
import Modal from "../../../components/base/modal";
import Image from "../../../components/base/image";
import { formatDate } from "../../../utils/formatData";
import { HTTP_CODE } from "../../../constants";
import { saveAs } from "file-saver";
import useKeyPress from "../../../hooks/useKeyPress";

export default function AdminStudent() {
  const [listStudent, setListStudent] = useState<Student[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [keySearch, setKeySearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showFuntions, setShowFuntions] = useState<boolean>(false);
  const [showIndex, setShowIndex] = useState<string>("");
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<string | undefined>("");
  const [baseId, setBaseId] = useState<string | undefined>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showIamge, setShowImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [showModalBlock, setShowModalBlock] = useState<boolean>(false);

  const inputRef = useRef<any>(null);

  const records: SelectType<number>[] = [
    {
      label: "Hiện thị 10 bản ghi trên trang",
      value: 10,
    },
    {
      label: "Hiện thị 20 bản ghi trên trang",
      value: 20,
    },
    {
      label: "Hiện thị 30 bản ghi trên trang",
      value: 30,
    },
    {
      label: "Hiện thị 50 bản ghi trên trang",
      value: 50,
    },
    {
      label: "Hiện thị 100 bản ghi trên trang",
      value: 100,
    },
  ];

  // Sử dụng useDebounce hook
  const debouceValue = useDebounce(keySearch, 300);

  // Gọi API lấy danh sách sinh viên
  const loadData = async () => {
    // Hiển thị loading
    setLoading(true);
    try {
      const response = await searchAndPaging(
        debouceValue,
        pageSize,
        currentPage
      );
      // Cập nhật state danh sách sinh viên
      setListStudent(response.data.data.students);

      // Cập nhật state tổng số trang
      setTotalPages(response.data.data.totalPage);

      // Cập nhật state tổng số kết quả
      setTotalResults(response.data.data.totalResults);

      // Tắt loading
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [currentPage, debouceValue, pageSize]);

  // Render danh sách các trang ở thanh footer
  const renderPages = () => {
    // Tạo mảng lưu trữ số trang khi lặp qua tổng số trang lấy ra từ DB
    const pages: number[] = [];

    // Lặp qua tổng số trang và push từng trang vào trong mảng
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    // Trả ra danh sách các phần tử đại diện cho các trang
    return (
      <>
        {pages.map((page: number, i: number) => (
          <span
            onClick={() => setCurrentPage(page)}
            key={i + 1}
            className={`cursor-pointer hover:bg-[#dadada] number-page ${
              page === currentPage ? "active" : ""
            }`}
          >
            {page}
          </span>
        ))}
      </>
    );
  };

  // Hàm chuyển đến trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      // Cập nhật lại trang hiện tại: trang hiện tại + 1
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  // Hàm quay lại trang trước đó
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      // Cập nhật lại trang hiện tại: trang hiện tại - 1
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  // Thay đổi số lượng bản ghi hiện thị trên 1 trang
  const handleChangePageSize = (pageSize: number) => {
    // Cập nhật lại số lượng bản ghi hiện thị trên 1 trang
    setPageSize(+pageSize);
  };

  // Hiển thị form thêm mới sinh viên
  const handleShowForm = (id: string | undefined) => {
    setShowForm(true);
    setBaseId(id);
  };

  // Đóng form thêm mới
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Ẩn / mở chức năng
  const handleToggleFunction = (index: string) => {
    setShowFuntions(!showFuntions);
    setShowIndex(index);
  };

  // Hàm xử lý sự kiện click ra ngoài Option
  const handleClickOutsideOption = (e: any) => {
    const target = e.target as HTMLElement;
    if (showFuntions && !target.closest(".fa-angle-down")) {
      setShowFuntions(false);
    }

    if (showOptions && !target.closest(".img-excel")) {
      setShowOptions(false);
    }

    if (selectedRow && !target.closest("tr")) {
      setSelectedRow("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideOption);
    return () => {
      window.removeEventListener("click", handleClickOutsideOption);
    };
  }, [showFuntions, showOptions, selectedRow]);

  // Hàm checkAll nút checkbox và cập nhật danh sách Id của sinh viên vào mảng
  const handleSelectedAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedIds([]);
    } else {
      setSelectAll(true);
      setSelectedIds(listStudent.map((student) => student.StudentId));
    }
  };

  // Cập nhật id của sinh viên vào trong mảng
  const handleSelectIds = (id: string | undefined) => {
    // Lấy vị trí phần tử được select
    const selectedIndex = selectedIds.findIndex((item: string) => item === id);

    let newSelectedStudents = [...selectedIds];

    if (selectedIndex === -1) {
      newSelectedStudents.push(id);
    } else {
      newSelectedStudents.splice(selectedIndex, 1);
    }

    // Lưu mảng được selected
    setSelectedIds(newSelectedStudents);

    setSelectAll(newSelectedStudents.length === listStudent.length);
  };

  // Đánh dấu hàng đang được chọn
  const handleSelectedRow = (row: string | undefined) => {
    setSelectedRow(row);
  };

  /**
   * Mở modal xác nhận xóa
   * @param id Id của sinh viên cần xóa
   */
  const handleShowModal = (id: string | undefined) => {
    setBaseId(id);
    setShowModal(true);
  };

  // Đóng modal xác nhận xóa
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Hàm xác nhận xóa thông tin sinh viên theo Id
  const handleDelete = async () => {
    try {
      const response = await deleteStudent(baseId);

      if (response.data.status === 200) {
        loadData();
        setShowModal(false);
        setBaseId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hiển thị chi tiết hình ảnh
  const handleShowImage = (url: string | undefined) => {
    setShowImage(true);

    setImageUrl(url);
  };

  // Tắt xem chi tiết hình ảnh
  const handleCloseImage = () => {
    setShowImage(false);

    setImageUrl("");
  };

  // Chặn và mở chặn sinh viên
  const handleToggleStatus = (id: string | undefined) => {
    setShowModalBlock(true);
    setBaseId(id);
  };

  // Chặn và mở chặn sinh viên
  const handleCloseModalBlock = () => {
    setShowModalBlock(false);
  };

  // Gọi API chặn / bỏ chặn sinh viên
  const handleBlock = async () => {
    try {
      const response = await toggleStatus(baseId);
      if (response.data.status === HTTP_CODE.SUCCESS) {
        setShowModalBlock(false);
        setBaseId("");
        loadData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Xóa nhiều sinh viên theo id
  const handleDeleteMultiple = async () => {
    const response = await deleteMultiple(selectedIds);

    if (response.data.status === HTTP_CODE.SUCCESS) {
      loadData();
      setSelectedIds([]);
      setSelectAll(false);
    }
  };

  /**
   * Export excel danh sách sinh viên
   * Author: NVQUY (19/06/2024)
   */
  const handleExprtExcel = async () => {
    try {
      const response = await exportExcel();

      // Lấy tên file từ header nếu có, hoặc đặt tên mặc định
      const filename = response.headers["content-disposition"]
        ? response.headers["content-disposition"].split("filename=")[1]
        : "export.xlsx";

      // Sử dụng file-saver để lưu file trên máy người dùng
      saveAs(response.data, filename);
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy giá trị từ file trên máy tính
  const handleChangeFile = async (event: any) => {
    event.preventDefault();
    const fileName = event.target.files[0];

    if (fileName) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", fileName);

        const response = await importExcel(formData);

        if (response.data.status === HTTP_CODE.CREATED) {
          loadData();
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (enterPress && ctrlPress) {
      setShowForm(true);
    }
  }, [ctrlPress, enterPress]);

  return (
    <>
      {/* Form quản lý sinh viên */}
      {showForm && (
        <FormStudent
          baseId={baseId}
          onClose={handleCloseForm}
          onLoad={loadData}
        />
      )}

      {/* Loader */}
      {loading && <Loader />}

      {/* Modal xác nhận xóa */}
      {showModal && (
        <Modal
          title="Xác nhận"
          type="warning"
          content={`Bạn có chắc chắn muốn sinh viên này không?`}
          onClose={handleCloseModal}
          onConfirm={handleDelete}
        />
      )}

      {/* Modal xác nhận Chặn / Bỏ chặn */}
      {showModalBlock && (
        <Modal
          title="Xác nhận"
          type="warning"
          content={`Bạn có chắc chắn muốn chặn sinh viên này không?`}
          onClose={handleCloseModalBlock}
          onConfirm={handleBlock}
        />
      )}

      {/* Component Image hiển thị chi tiết hình ảnh */}
      {showIamge && <Image url={imageUrl} onClose={handleCloseImage} />}

      <div className="bg-white h-full justify-end px-6 py-3">
        <div className="flex justify-between items-center ">
          <h3 className="font-bold text-[24px]">Sinh viên</h3>
          <Button
            htmlType="button"
            onClick={() => handleShowForm("")}
            type="primary"
            size="df"
          >
            Thêm mới sinh viên
          </Button>
        </div>
        <div className="mt-3 bg-[#F7F8F9] p-3 rounded flex justify-between">
          <div>
            {selectedIds.length > 0 && (
              <Button
                onClick={handleDeleteMultiple}
                type="danger"
                size="df"
                htmlType="button"
              >
                Xóa tất cả
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-3">
              <div
                onMouseDown={() => {
                  inputRef.current.click();
                }}
                className="h-[36px] border border-solid rounded border-[#dadada] list-none flex gap-2 items-center px-3 py-2 cursor-pointer hover:bg-[#f5f5f5] transition-all ease-linear"
              >
                <i className="fa-solid fa-upload text-gray-700"></i>
                <span>Nhập dữ liệu</span>
              </div>
              <input
                onChange={handleChangeFile}
                ref={inputRef}
                type="file"
                accept="*"
                hidden
              />

              <div
                onClick={handleExprtExcel}
                className="h-[36px] border border-solid rounded border-[#dadada] list-none flex gap-2 items-center  px-3 py-2 cursor-pointer hover:bg-[#f5f5f5] transition-all ease-linear"
              >
                <i className="fa-solid text-gray-700 fa-download"></i>
                <span> Xuất dữ liệu</span>
              </div>
            </div>

            <Input
              style={{ width: 300 }}
              search={true}
              value={keySearch}
              onChange={(e) => setKeySearch(e.target.value)}
              placeholder="Tên sinh viên"
            />

            <i
              onClick={loadData}
              title="Tải dữ liệu"
              className="text-[20px] text-gray-600 cursor-pointer hover:text-gray-500 fa-solid fa-rotate-right"
            ></i>
          </div>
        </div>

        <main className="mt-3 table-main w-full relative">
          <table className="w-full relative">
            <thead>
              <tr>
                <th className="col-fixed-start">
                  <input
                    onChange={handleSelectedAll}
                    checked={selectAll}
                    type="checkbox"
                  />
                </th>
                <th className="min-w-[100px] max-w-[100px]">Hình ảnh</th>
                <th className="min-w-[150px] max-w-[150px]">Mã</th>
                <th className="min-w-[200px] max-w-[200px]">Tên</th>
                <th className="min-w-[100px] max-w-[100px]">Giới tính</th>
                <th className="min-w-[150px] max-w-[150px] text-center">
                  Ngày sinh
                </th>
                <th className="min-w-[200px] max-w-[200px]">Email</th>
                <th className="min-w-[200px] max-w-[200px]">Số điện thoại</th>
                <th className="min-w-[200px] max-w-[200px]">Lớp</th>
                <th className="min-w-[150px] max-w-[150px]">Trạng thái</th>
                <th className="min-w-[200px]">Địa chỉ</th>
                <th className="min-w-[120px] max-w-[120px] col-fixed-end">
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody>
              {listStudent.map((student: Student, index: number) => (
                <tr
                  onClick={() => handleSelectedRow(student.StudentId)}
                  key={index}
                  className={`${
                    selectedRow == student.StudentId ||
                    selectedIds.includes(student.StudentId)
                      ? "checked"
                      : ""
                  }`}
                >
                  <td className="col-fixed-start">
                    <input
                      onChange={() => handleSelectIds(student.StudentId)}
                      checked={selectedIds.includes(student.StudentId)}
                      type="checkbox"
                    />
                  </td>
                  <td>
                    <div className="flex students-center justify-center">
                      <img
                        onClick={() => handleShowImage(student.Avatar)}
                        title="Xem chi tiết"
                        src={
                          student.Avatar ||
                          "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                        }
                        alt={`Hình ảnh ${index + 1}`}
                        className="hover:cursor-pointer min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px]  rounded-full object-cover"
                      />
                    </div>
                  </td>
                  <td>{student.StudentCode}</td>
                  <td>{student.StudentName}</td>
                  <td className="text-center">{student.Gender}</td>
                  <td className="text-center">
                    {formatDate(student.DateOfBirth, "dd/MM/yyyy")}
                  </td>
                  <td>{student.Email}</td>
                  <td className="text-center">{student.PhoneNumber}</td>
                  <td className="text-center">{student.ClassName}</td>
                  <td className="text-center ">
                    {student.Status != undefined && student.Status === 1 ? (
                      <p
                        className={`bg-[#f6ffed] border-[#b7eb8f] border-solid border text-[#389e0d] h-[20px] rounded-md text-[13px]`}
                      >
                        Đang hoạt động
                      </p>
                    ) : (
                      <p
                        className={`bg-[#fff2f0] border-[#ffccc7] border-solid border text-[#ff4d4f] h-[20px] rounded-md text-[13px]`}
                      >
                        Ngừng hoạt động
                      </p>
                    )}
                  </td>
                  <td>{student.Address}</td>
                  <td className="col-fixed-end text-center">
                    <div className="flex items-center gap-2 justify-center relative z-[500000]">
                      <span
                        onClick={() => handleShowForm(student.StudentId)}
                        className="text-[#0062cc] cursor-pointer hover:underline"
                      >
                        Sửa
                      </span>
                      <i
                        onClick={() =>
                          student.StudentId &&
                          handleToggleFunction(student.StudentId)
                        }
                        className="fa-solid fa-angle-down cursor-pointer text-[#0062cc]"
                      ></i>

                      {showFuntions && student.StudentId === showIndex ? (
                        <ul className="absolute border bottom-[-10px] right-0 bg-white border-solid border-[#dadada] w-[150px] text-start">
                          <li className="list-none px-2 py-1 rounded hover:bg-[#f5f5f5] cursor-pointer">
                            Nhân bản
                          </li>
                          <li
                            onClick={() =>
                              handleToggleStatus(student.StudentId)
                            }
                            className="list-none px-2 py-1 rounded hover:bg-[#f5f5f5] cursor-pointer"
                          >
                            Ngừng hoạt động
                          </li>
                          <li
                            onClick={() => handleShowModal(student.StudentId)}
                            className="list-none px-2 py-1 rounded hover:bg-[#f5f5f5] cursor-pointer"
                          >
                            Xóa
                          </li>
                        </ul>
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        <div className="mt-[12px] px-4 py-2 flex justify-between items-center">
          <div>
            Hiển thị <b>{listStudent.length}</b> trên <b>{totalResults}</b> bản
            ghi
          </div>
          <div className="flex items-center gap-3 relative">
            <Select
              position="top"
              label="Hiển thị 10 bản ghi trên trang"
              style={{ width: 270 }}
              onChange={handleChangePageSize}
              options={records.map((record) => {
                return {
                  value: record.value,
                  label: record.label,
                };
              })}
            />
            <span
              onClick={handlePreviousPage}
              className={`number-page ${currentPage === 1 ? "disable" : ""}`}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </span>
            {renderPages()}
            <span
              className={`number-page ${
                currentPage === totalPages ? "disable" : ""
              }`}
              onClick={handleNextPage}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
