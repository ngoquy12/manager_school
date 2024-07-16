import React, { useEffect, useState } from "react";
import styles from "./select.module.scss";
import classNames from "classnames";
import { SelectProps, SelectType } from "./SelectType";

export default function Select<T>({
  onChange,
  options,
  label,
  style,
  position = "bottom",
}: SelectProps<T>) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handler = (item: SelectType<T>) => {
    setValue(item.label);
    onChange?.(item.value);
    setShowOptions(false);
  };

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
    <div style={style} className={styles.select_container}>
      {showOptions && (
        <ul
          className={classNames(styles.list_result, {
            [styles.top]: position === "top",
            [styles.bottom]: position === "bottom",
          })}
        >
          {options?.map((item, index) => (
            <li
              key={index}
              onClick={() => handler(item)}
              className={styles.result}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
      <div
        className={styles.label}
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>{value || label}</span>
        {position === "top" ? (
          <i
            className={`fa-solid fa-angle-down transform ${
              showOptions ? "rotate-180" : ""
            }`}
          ></i>
        ) : (
          <i
            className={`fa-solid fa-angle-up transform ${
              showOptions ? "rotate-180" : ""
            }`}
          ></i>
        )}
      </div>
    </div>
  );
}
