import { Button, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form className="border border-[#dadada] border-solid px-6 py-5 rounded shadow w-[350px] flex flex-col gap-6">
          <img className="object-contain h-9" src="logo.png" alt="" />
          <h3 className="text-center text-[22px]">Đăng nhập tài khoản</h3>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <Input className="h-9 rounded" id="email" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="password">
              Mật khẩu
            </label>
            <Input.Password
              className="h-9 rounded"
              id="password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </div>
          <div>
            <Button type="primary" className="w-full h-9 mb-3">
              Đăng nhập
            </Button>
            <div className="text-center">
              <Link
                to={"/forget-pasaword"}
                className="no-underline hover:underline hover:opacity-8"
              >
                Quên mật khẩu
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
