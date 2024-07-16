import React, { useEffect, useState } from "react";
import Button from "../../base/button";
import Combobox from "../../base/combobox";
import Input from "../../base/input";
import { ClassRoom } from "../../../model/ClassRoom";
import { findAllClass } from "../../../services/class.service";
import { Student } from "../../../model/Student";
import {
  checkFieldIsEmpty,
  checkFormatStudentCode,
  validateEmail,
  validatePhoneNumber,
} from "../../../utils/validateData";
import { formatDate } from "../../../utils/formatData";
import {
  createStudent,
  getStudentById,
  updateStudent,
} from "../../../services/student.service";
import Loader from "../../base/loader";
import { HTTP_CODE } from "../../../constants";
import { resourceVN } from "../../../resources/resourceVN";

type PropTypes = {
  onClose: () => void;
  onLoad: () => void;
  baseId: string | undefined;
};

const genders = [
  {
    id: 0,
    name: "Nam",
  },
  {
    id: 1,
    name: "Nữ",
  },
  {
    id: 2,
    name: "Không xác định",
  },
];

export default function FormStudent({ onClose, onLoad, baseId }: PropTypes) {
  const [listClasses, setListClasses] = useState<ClassRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [studentInfo, setStudentInfo] = useState<Student>({
    StudentCode: "",
    StudentName: "",
    Gender: 0,
    DateOfBirth: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    Avatar: "",
    ClassId: "",
    CreatedBy: "",
    ModifiedBy: "",
  });

  // Danh sách các State chứa lỗi
  const [studentCodeError, setStudentCodeError] = useState<string>("");
  const [studentNameError, setStudentNameError] = useState<string>("");
  const [dateOfBirthError, setDateOfBirthError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [classIdError, setClassIdError] = useState<string>("");

  // Lấy danh sách tất cả lớp học
  const findAllClassRoom = async () => {
    try {
      const result = await findAllClass();
      if (result) {
        setListClasses(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findAllClassRoom();
  }, []);

  // Cập nhật thông tin giá trị từ Form vào State của sinh viên
  const handleChange = (value: string) => {
    setStudentInfo({
      ...studentInfo,
      ClassId: value,
    });

    validateData("ClassId", value);
  };

  // Validate dữ liệu đầu vào
  const validateData = (name: string, value: any) => {
    let valid = true;

    if (name === "StudentCode") {
      if (checkFieldIsEmpty(value)) {
        setStudentCodeError("Mã sinh viên không được để trống");
        valid = false;
      } else {
        if (!checkFormatStudentCode(value)) {
          setStudentCodeError("Mã sinh viên không đúng định dạng");
          valid = false;
        } else {
          setStudentCodeError("");
        }
      }
    }

    if (name === "StudentName") {
      if (checkFieldIsEmpty(value)) {
        setStudentNameError("Tên sinh viên không được để trống");
        valid = false;
      } else {
        setStudentNameError("");
      }
    }

    if (name === "Email") {
      if (checkFieldIsEmpty(value)) {
        setEmailError("Email không được để trống");
        valid = false;
      } else {
        if (!validateEmail(value)) {
          setEmailError("Email không đúng định dạng");
          valid = false;
        } else {
          setEmailError("");
        }
      }
    }

    if (name === "PhoneNumber") {
      if (value) {
        if (!validatePhoneNumber(value)) {
          setPhoneNumberError("Số điện thoại không đúng định dạng");
          valid = false;
        } else {
          setPhoneNumberError("");
        }
      }
    }

    if (name === "ClassId") {
      if (checkFieldIsEmpty(value)) {
        setClassIdError("Tên lớp không được để trống");
        valid = false;
      } else {
        setClassIdError("");
      }
    }

    if (name === "DateOfBirth") {
      if (value) {
        if (
          formatDate(value, "yyyy-MM-dd") > formatDate(new Date(), "yyyy-MM-dd")
        ) {
          setDateOfBirthError("Ngày sinh không được lớn hơn ngày hiện tại");
          valid = false;
        } else {
          setDateOfBirthError("");
        }
      }
    }

    return valid;
  };

  // Lấy giá trị trong từng ô input
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Cập nhật lại state cho đối tượng sinh viên
    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });

    // Validate dữ liệu mỗi lần onChange
    validateData(name, value);
  };

  // Lấy giá trị giới tính
  const handleChangeGender = (value: number) => {
    setStudentInfo({
      ...studentInfo,
      Gender: value,
    });
  };

  // Tìm kiếm thông tin của sinh viên và nhập vào input của Form
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Phản hồi trả về từ server
        const response = await getStudentById(baseId);

        // Gán dữ liệu cho student
        const student = response.data.data;

        // Cập nhật lại state cho đối tượng sinh viên
        setStudentInfo(student);
      } catch (error) {
        console.log(error);
      }
    };

    if (baseId) {
      fetchData();
    }
  }, [baseId]);

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const studentCodeValid = validateData(
      "StudentCode",
      studentInfo.StudentCode
    );
    const studentNameValid = validateData(
      "StudentName",
      studentInfo.StudentName
    );
    const dateOfBirthValid = validateData(
      "DateOfBirth",
      studentInfo.DateOfBirth
    );
    const emailValid = validateData("Email", studentInfo.Email);
    const phoneNumberValid = validateData(
      "PhoneNumber",
      studentInfo.PhoneNumber
    );
    const classValid = validateData("ClassId", studentInfo.ClassId);

    if (
      studentCodeValid &&
      studentNameValid &&
      dateOfBirthValid &&
      emailValid &&
      phoneNumberValid &&
      classValid
    ) {
      // Gọi API thêm mới dữ liệu
      try {
        setIsLoading(true);
        let response;
        if (baseId) {
          response = await updateStudent(baseId, studentInfo);
        } else {
          response = await createStudent(studentInfo);
        }
        const statusResponse = response.data.status;

        if (
          statusResponse === HTTP_CODE.CREATED ||
          statusResponse === HTTP_CODE.SUCCESS
        ) {
          // Hiển thị thông báo

          // Render lại danh sách sinh viên
          onLoad();

          // Đóng form
          onClose();

          // Tắt loading
          setIsLoading(false);
        }
      } catch (error: any) {
        const statusCode = error.response.data.status;
        const message = error.response.data.userMessage;
        if (statusCode === HTTP_CODE.BAD_REQUEST) {
          alert(message);
        }
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="overlay overlay-dark">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[650px] px-6 py-5 rounded"
        >
          <header className="flex items-center justify-between text-[18px] font-semibold">
            <h3>{!baseId ? " Thêm mới sinh viên" : "Cập nhật sinh viên"}</h3>
            <div
              onClick={onClose}
              className="w-6 h-6 text-center cursor-pointer leading-6 rounded-full hover:bg-[#dadada]"
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </header>
          <main className="grid grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="studentCode">
                  Mã
                </label>
                <Input
                  tabIndex={1}
                  value={studentInfo.StudentCode}
                  dangerous={studentCodeError ? true : false}
                  onChange={handleChangeValue}
                  name="StudentCode"
                  id="studentCode"
                  className="w-full"
                />
                {studentCodeError && (
                  <span className="absolute bottom-[-20px] text-[13px] text-red-500">
                    {studentCodeError}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="gender">
                  Giới tính
                </label>
                <div className="flex items-center gap-3 h-9">
                  {genders.map((gender) => (
                    <div key={gender.id} className="flex items-center gap-2">
                      <input
                        tabIndex={2}
                        onChange={() => handleChangeGender(gender.id)}
                        checked={studentInfo.Gender == gender.id}
                        type="radio"
                        id={gender.name}
                        value={gender.name}
                      />
                      <label htmlFor={gender.name}>{gender.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="email">
                  Email
                </label>
                <Input
                  tabIndex={3}
                  value={studentInfo.Email}
                  dangerous={emailError ? true : false}
                  onChange={handleChangeValue}
                  name="Email"
                  id="email"
                  className="w-full"
                />
                {emailError && (
                  <span className="absolute bottom-[-20px] text-[13px] text-red-500">
                    {emailError}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="email">
                  Lớp
                </label>
                <Combobox
                  tabIndex={4}
                  name="ClassId"
                  dangerous={classIdError ? true : false}
                  onChange={handleChange}
                  value={studentInfo.ClassId}
                  options={listClasses.map((classItem) => {
                    return {
                      label: classItem.ClassName,
                      value: classItem.ClassId,
                    };
                  })}
                />
                {classIdError && (
                  <span className="absolute bottom-[-20px] text-[13px] text-red-500">
                    {classIdError}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="studentName">
                  Tên
                </label>
                <Input
                  tabIndex={5}
                  value={studentInfo.StudentName}
                  dangerous={studentNameError ? true : false}
                  onChange={handleChangeValue}
                  name="StudentName"
                  id="studentName"
                  className="w-full"
                />
                {studentNameError && (
                  <span className="absolute bottom-[-20px] text-[13px] text-red-500">
                    {studentNameError}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="dateOfBirth">
                  Ngày sinh
                </label>
                <Input
                  tabIndex={6}
                  dangerous={dateOfBirthError ? true : false}
                  onChange={handleChangeValue}
                  name="DateOfBirth"
                  id="dateOfBirth"
                  type="date"
                  className="w-full"
                  value={formatDate(studentInfo.DateOfBirth, "yyyy-MM-dd")}
                />
                {dateOfBirthError && (
                  <span className="absolute bottom-[-20px] text-[13px] text-red-500">
                    {dateOfBirthError}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="font-semibold" htmlFor="phoneNumber">
                  Số điện thoại
                </label>
                <Input
                  tabIndex={7}
                  value={studentInfo.PhoneNumber}
                  onChange={handleChangeValue}
                  dangerous={phoneNumberError ? true : false}
                  name="PhoneNumber"
                  id="phoneNumber"
                  className="w-full"
                />
                {phoneNumberError && (
                  <span className="absolute bottom-[-20px] text-[13px] text-red-500">
                    {phoneNumberError}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="image">
                  {resourceVN.image}
                </label>
                <Input
                  value={studentInfo.Avatar}
                  onChange={handleChangeValue}
                  id="image"
                  name="Avatar"
                  className="w-full"
                />
              </div>
            </div>
          </main>
          <div className="mt-[24px] flex gap-2 flex-col">
            <label className="font-semibold" htmlFor="address">
              Địa chỉ
            </label>
            <Input
              tabIndex={8}
              value={studentInfo.Address}
              onChange={handleChangeValue}
              name="Address"
              id="address"
              className="w-full"
            />
          </div>
          <div
            style={{ borderBottom: "1px solid #dadada" }}
            className="my-6"
          ></div>
          <footer className="flex items-center justify-between">
            <Button
              tabIndex={9}
              onClick={onClose}
              htmlType="button"
              type="secondary"
              size="df"
            >
              Hủy
            </Button>
            <Button tabIndex={9} htmlType="submit" type="primary" size="df">
              Thêm
            </Button>
          </footer>
        </form>
      </div>
    </>
  );
}
