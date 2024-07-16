import { ModalType } from "./Type";
import Button from "../button";
import Warning from "/warning.svg";
import Success from "/success.svg";
import Help from "/help.svg";
import Error from "/error.svg";

const SUCCESS = "success";

const WARNING = "warning";

const DANGER = "danger";

const HELP = "help";

export default function Modal({
  cancelText,
  okText,
  title,
  content,
  onClose,
  onConfirm,
  type,
}: ModalType) {
  return (
    <>
      <div className="overlay overlay-dark">
        <div className="bg-white w-[400px] rounded px-6 py-5 flex flex-col gap-6">
          <header className="flex items-center justify-between text-[18px]">
            <h3>{title || "Tiêu đề"}</h3>
            <div
              onClick={onClose}
              className="hover:bg-[#dadada] w-[24px] h-[24px] text-center leading-6 cursor-pointer rounded-full"
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </header>
          <main className="flex items-center gap-3">
            {type === HELP ? (
              <img className="h-9" src={Help} alt="" />
            ) : type === DANGER ? (
              <img className="h-9" src={Error} alt="" />
            ) : type === WARNING ? (
              <img className="h-9" src={Warning} alt="" />
            ) : (
              <img className="h-9" src={Success} alt="" />
            )}

            <p>{content || "Nội dung thông báo"}</p>
          </main>
          <div style={{ borderBottom: "1px solid #dadada" }}></div>
          <footer
            className={`flex justify-${
              type === SUCCESS ? "center" : "end"
            } gap-2`}
          >
            {type === SUCCESS ? (
              <>
                <Button
                  onClick={onClose}
                  size="df"
                  type="primary"
                  htmlType="button"
                >
                  {cancelText || "Hủy"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={onClose}
                  size="df"
                  type="secondary"
                  htmlType="button"
                >
                  {cancelText || "Hủy"}
                </Button>
                <Button
                  onClick={onConfirm}
                  size="df"
                  type="primary"
                  htmlType="button"
                >
                  {okText || "Xác nhận"}
                </Button>
              </>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}
