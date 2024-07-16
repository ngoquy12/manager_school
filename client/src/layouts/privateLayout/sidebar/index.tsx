import { NavLink } from "react-router-dom";
import "./sidebar.scss";

export default function Sidebar() {
  return (
    <>
      <menu className="min-w-[200px] max-w-[200px] h-screen bg-[#041434]">
        <div className="h-[56px] flex items-center justify-center">
          <img className="h-[24px]" src="/logo.png" alt="" />
        </div>
        <div className="flex flex-col py-5 px-3 gap-1 sidebar">
          <NavLink end className="route-link" to="/admin">
            <i className="fa-solid fa-house"></i>
            <span>Tổng quan</span>
          </NavLink>
          <NavLink className="route-link" to="/admin/student">
            <i className="fa-solid fa-user-graduate"></i>
            <span>Sinh viên</span>
          </NavLink>
          <NavLink className="route-link" to="/admin/account">
            <i className="fa-solid fa-users"></i>
            <span>Nhân sự</span>
          </NavLink>
        </div>
      </menu>
    </>
  );
}
