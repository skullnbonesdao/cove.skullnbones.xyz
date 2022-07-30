import { ToastOptions } from "mosha-vue-toastify";

export const TOAST_INFO: ToastOptions = {
  timeout: 3000,
  position: "bottom-right",
  type: "info",
};

export const TOAST_SUCCESS: ToastOptions = {
  timeout: 3000,
  position: "bottom-right",
  type: "success",
};

export const TOAST_ERROR: ToastOptions = {
  timeout: 3000,
  position: "bottom-right",
  type: "danger",
};
