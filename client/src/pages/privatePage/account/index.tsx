import { useTranslation } from "react-i18next";
import Combobox from "../../../components/base/combobox";
import Modal from "../../../components/base/modal";
import Select from "../../../components/base/select";
import { SelectType } from "../../../components/base/select/SelectType";
import { formatDate } from "../../../utils/formatData";
import Loader from "../../../components/base/loader";
import { useState } from "react";

export default function AdminAccount() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const records: SelectType<number>[] = [
    {
      label: "D08.48.01",
      value: Math.ceil(Math.random() * 100000),
    },
    {
      label: "D09.48.01",
      value: Math.ceil(Math.random() * 100000),
    },
    {
      label: "D010.48.01",
      value: Math.ceil(Math.random() * 100000),
    },
    {
      label: "D010.48.01",
      value: Math.ceil(Math.random() * 100000),
    },
    {
      label: "D011.48.01",
      value: Math.ceil(Math.random() * 100000),
    },
  ];

  const handleChange = (value: any) => {
    console.log("Value: " + value);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ flex: 1 }}>
      {isLoading && <Loader />}
      <div>
        <h1>{t("Add new student")}</h1>
        <p>{t("description")}</p>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("vi")}>Tiếng Việt</button>
      </div>
      {/* <Select
        position="top"
        label="Hiển thị 10 bản ghi trên trang"
        style={{ width: 270 }}
        onChange={handleChange}
        options={records.map((record) => {
          return {
            value: record.value,
            label: record.label,
          };
        })}
      /> */}

      {/* <Combobox onChange={handleChange} options={records} /> */}
      {/* <Modal type="success" cancelText="Đồng ý" /> */}
    </div>
  );
}
