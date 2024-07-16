import { ImageTypes } from "./Type";

const AVATAR_DEFAULT =
  "https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png";

const AVATAR_NAME = `Ảnh đại diện ${Math.ceil(Math.random() * 10000)}`;

export default function Image({ url, style, onClose }: ImageTypes) {
  return (
    <>
      <div className="overlay overlay-dark w-full h-full">
        <div className="flex relative">
          <img
            src={url || AVATAR_DEFAULT}
            alt={AVATAR_NAME}
            style={style}
            className="shadow object-cover rounded min-w-[500px] max-w-[500px] min-h-[400px] max-h-[400px]"
          />
          <div
            className="cursor-pointer rounded-full absolute w-[40px] h-[40px] text-center leading-10 right-[-10px] top-[-10px]"
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <i
              onClick={onClose}
              title="Đóng"
              className="fa-solid fa-xmark text-white hover:text-[#848282]"
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
