import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";
import { removeNotification } from "@/store/slice/notificationSlice";

const AUTO_DISMISS_MS = 4000;

const NotificationToast = ({ notification, onClose }) => {
  const isError = notification.type === "error";

  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="toast show align-items-center border-0 mb-2"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ pointerEvents: "auto" }}
    >
      <div className="d-flex align-items-center p-2">
        <span className={`me-2 text-${isError ? "danger" : "success"}`}>
          {isError ? <FiAlertCircle /> : <FiCheckCircle />}
        </span>
        <div className="toast-body py-0 ps-0">
          {notification.message ||
            (isError ? "Something went wrong" : "Success")}
        </div>
        <button
          type="button"
          className="btn btn-sm p-0 border-0 bg-transparent ms-auto text-muted"
          aria-label="Close"
          onClick={onClose}
        >
          <FiX />
        </button>
      </div>
    </div>
  );
};

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1100, pointerEvents: "none" }}
    >
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={() => dispatch(removeNotification(notification.id))}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
