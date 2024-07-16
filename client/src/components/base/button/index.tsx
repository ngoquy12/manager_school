import classNames from "classnames";
import { ButtonTypes } from "./ButtonType";
import styles from "./button.module.scss";

const PRIMARY = "primary";
const DANGER = "danger";
const WARNING = "warning";
const SECONDARY = "secondary";
const SUCCESS = "success";

export default function Button({
  children,
  disabled,
  size,
  type,
  onClick,
  htmlType,
  tabIndex,
}: ButtonTypes) {
  const buttonStyles = classNames(styles.button, {
    [styles.lg]: size == "lg",
    [styles.sm]: size == "sm",
    [styles.df]: size == "df",
    [styles.primary]: type == PRIMARY,
    [styles.danger]: type == DANGER,
    [styles.warning]: type == WARNING,
    [styles.secondary]: type == SECONDARY,
    [styles.success]: type == SUCCESS,
  });
  return (
    <>
      <button
        tabIndex={tabIndex}
        type={htmlType || "button"}
        onClick={onClick}
        className={buttonStyles}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}
