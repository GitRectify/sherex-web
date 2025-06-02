import { toast } from "react-toastify";

export const toastNotification = (msg, type, duration) => {
  return type === "success"
    ? toast.success(msg, {
        position: "bottom-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon:true,
      })
    : toast.error(msg, {
        position: "bottom-right",
        autoClose: duration,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
};
