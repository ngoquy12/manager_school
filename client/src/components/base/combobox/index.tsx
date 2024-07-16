import { useState } from "react";
import "./combobox.scss";
import useDebounce from "../../../hooks/useDebounce";
import { ComboboxType, ResultType } from "./Type";

export default function Combobox<T>({
  options = [],
  onChange,
  style,
  label,
  dangerous,
  name,
  value,
  tabIndex,
}: ComboboxType<T>) {
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(-1);
  const [inputLabel, setInputLabel] = useState<any>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Ẩn / Hiện danh sách kết quả
  const handleToggle = () => {
    setShowResults((prev) => !prev);
  };

  const handleGetValue = (item: ResultType<T>, index: number) => {
    setSelected(index);
    setInputLabel(item);
    setShowResults(false);
    onChange?.(item.value);
  };

  const searchValue = useDebounce(searchTerm, 300);

  // Tìm kiếm bản ghi
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div style={style} className="combobox-container">
      <div className="filter-container">
        <input
          tabIndex={tabIndex}
          name={name}
          className={`${dangerous ? "dangerous" : ""} `}
          type="text"
          value={
            options.find((option) => option.value === value)?.label ||
            inputLabel.label
          }
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onClick={() => setShowResults(true)}
          placeholder={label || "Nhập lựa chọn hoặc tìm kiếm"}
        />
        <i
          onClick={handleToggle}
          className={`fa-solid fa-angle-down ${
            showResults ? "rotate-180" : ""
          }`}
        ></i>
      </div>
      {showResults && (
        <ul className="list-result">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleGetValue(option, index)}
              className={`result ${selected === index ? "selected" : ""}`}
            >
              <span>{option.label}</span>
              {selected === index && <i className="fa-solid fa-check"></i>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
