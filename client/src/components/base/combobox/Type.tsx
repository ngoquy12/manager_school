export type ResultType<T> = {
  label: string;
  value: T;
};

export type ComboboxType<T> = {
  options?: ResultType<T>[];
  onChange?: (value: T) => void;
  style?: React.CSSProperties;
  label?: string;
  dangerous?: boolean;
  name?: string;
  value?: string;
  tabIndex?: number;
};
