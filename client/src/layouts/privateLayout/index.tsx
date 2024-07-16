import HeaderAdmin from "./header";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex flex-col" style={{ width: "calc(100% - 200px)" }}>
          <HeaderAdmin />
          <div className="flex-1 bg-[#F5F5F5] p-1 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
