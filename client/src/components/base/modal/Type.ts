export type ModalType = {
  title?: string;
  okText?: string;
  cancelText?: string;
  style?: React.CSSProperties;
  content?: string;
  type?: "success" | "warning" | "danger" | "help";
  onClose?: () => void;
  onConfirm?: () => void;
};
