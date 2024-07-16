import classNames from "classnames";
import { InputType } from "./InputType";
import styles from "./input.module.scss";

export default function Input({
  defaultValue,
  placeholder,
  onChange,
  type,
  value,
  search,
  style,
  className,
  id,
  dangerous,
  name,
  tabIndex,
  ref,
}: InputType) {
  const inputStyles = classNames(styles.input, className, {
    [styles.dangerous]: dangerous,
  });
  return (
    <div className="relative flex items-center">
      <input
        ref={ref}
        id={id}
        style={style}
        className={inputStyles}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        tabIndex={tabIndex}
      />
      {search && (
        <i className="fa-solid fa-magnifying-glass absolute right-[16px] pl-2 text-gray-600 z-30  bg-white"></i>
      )}
    </div>
  );
}
