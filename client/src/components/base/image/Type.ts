import React from "react";

export type ImageTypes = {
  url?: string; // Đường dẫn của hình ảnh
  style?: React.CSSProperties;
  className?: string;
  onClose?: () => void;
};
