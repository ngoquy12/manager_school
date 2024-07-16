import { useEffect, useState } from "react";
import "./index.css";

export default function HeaderAdmin() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  // Hàm xử lý sự kiện click ra ngoài Option
  const handleClickOutsideOption = (e: any) => {
    const target = e.target as HTMLElement;
    if (showOptions && !target.closest(".fa-angle-down")) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideOption);
    return () => {
      window.removeEventListener("click", handleClickOutsideOption);
    };
  }, [showOptions]);

  return (
    <>
      <header className="h-[56px] bg-[#F6F8F9] border shadow-sm flex justify-between items-center px-6">
        <div>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="flex items-center gap-2 relative">
          <span className="font-semibold">Ngọ Văn Quý</span>
          <div className="flex items-center">
            <img
              className="h-[48px] w-[48px] object-cover rounded-full"
              src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
              alt=""
            />
            <i
              onClick={() => setShowOptions(!showOptions)}
              className="fa-solid fa-angle-down cursor-pointer hover:opacity-85"
            ></i>
          </div>
          {showOptions && (
            <ul
              style={{ zIndex: 10000000 }}
              className="w-[180px] bg-white z-20 border shadow absolute top-[50px] right-0 rounded fadeDown"
            >
              <li
                onClick={() => console.log(1)}
                className="hover:bg-[#E7EAEE] cursor-pointer transition-all ease-linear px-3 py-3 flex gap-2 items-center"
              >
                <i className="fa-regular fa-user"></i>
                <span>Thông tin cá nhân</span>
              </li>
              <li
                onClick={() => console.log(2)}
                className="hover:bg-[#E7EAEE] cursor-pointer transition-all ease-linear px-3 py-3 flex gap-2 items-center"
              >
                <i className="fa-solid fa-gear"></i>
                <span>Đổi mật khẩu</span>
              </li>
              <div style={{ borderBottom: "1px solid #dadada" }}></div>
              <li
                onClick={() => console.log(3)}
                className="hover:bg-[#E7EAEE] cursor-pointer transition-all ease-linear px-3 py-3 flex gap-2 items-center"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Đăng xuất</span>
              </li>
            </ul>
          )}
        </div>
      </header>
    </>
  );
}
