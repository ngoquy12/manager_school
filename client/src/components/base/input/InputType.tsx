import React from "react";

export type InputType = {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  type?: string;
  search?: boolean;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  dangerous?: boolean;
  name?: string;
  tabIndex?: number;
  ref?: React.Ref<HTMLInputElement>;
};
