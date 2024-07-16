// Định nghĩa kiểu generic cho SelectType
export type SelectType<T> = {
  label: string;
  value: T;
};

// Sử dụng kiểu generic cho SelectProps
export type SelectProps<T> = {
  onChange?: (value: T) => void;
  options?: SelectType<T>[];
  defaultValue?: T;
  label?: string;
  style: React.CSSProperties;
  position?: "top" | "bottom";
};
