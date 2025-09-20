import { useState, useCallback } from "react";
import { FiCheck, FiX } from "react-icons/fi";

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="position-fixed top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center z-1000"
      style={{
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Added subtle shadow
          textAlign: "center",
          fontFamily: "sans-serif", // Using a common sans-serif font
          color: "#333", // Dark grey text
        }}
      >
        <p style={{ marginBottom: "20px", fontSize: "1.1em" }}>{message}</p>
        <div style={{ marginTop: "20px" }}>
          <button
            className="bg-danger"
            onClick={onCancel}
            style={{
              marginRight: "10px",
              padding: "10px 20px",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.9em",
            }}
          >
            <FiX style={{ marginRight: "8px", fontSize: "1.2em" }} />
            Cancel
          </button>
          <button
            className="bg-success"
            onClick={onConfirm}
            style={{
              padding: "10px 20px",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "0.9em",
            }}
          >
            <FiCheck style={{ marginRight: "8px", fontSize: "1.2em" }} />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => {});
  const [onCancelCallback, setOnCancelCallback] = useState(() => {});

  const showConfirmation = useCallback((message, onConfirm, onCancel) => {
    console.log("ONCANCEL", onCancel);
    setMessage(message);
    setOnConfirmCallback(() => onConfirm || (() => {}));
    setOnCancelCallback(() => onCancel || (() => {}));
    setIsOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (typeof onConfirmCallback === "function") {
      onConfirmCallback();
    }
    setIsOpen(false);
  }, [onConfirmCallback]);

  const handleCancel = useCallback(() => {
    if (typeof onCancelCallback === "function") {
      onCancelCallback();
    }
    setIsOpen(false);
  }, [onCancelCallback]);

  return {
    showConfirmation,
    ConfirmationDialog: useCallback(
      ({ isOpen: propIsOpen, message: propMessage }) => (
        <ConfirmationDialog
          isOpen={isOpen || propIsOpen}
          message={message || propMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      ),
      [isOpen, message, handleConfirm, handleCancel]
    ),
  };
};

export default useConfirmation;
