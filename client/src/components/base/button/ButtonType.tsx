export type ButtonTypes = {
  type?: "primary" | "warning" | "danger" | "success" | "secondary";
  children?: React.ReactNode;
  size?: "lg" | "sm" | "df";
  disabled?: boolean;
  style?: string;
  radius?: number;
  onClick?: () => void;
  onDoubleClick?: (e: MouseEvent) => void;
  htmlType: "reset" | "submit" | "button";
  tabIndex?: number;
};
