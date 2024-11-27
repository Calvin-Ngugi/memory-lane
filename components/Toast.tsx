"use client";

import { useState, useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "error" | "success" | "info" | "warning"; // Define different toast types
  duration?: number; // Duration for toast to disappear
  onClose?: () => void;
};

const Toast = ({ message, type = "error", duration = 5000, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    error: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center justify-between px-4 py-3 rounded shadow-md space-x-4 ${
        typeStyles[type]
      }`}
    >
      <span>{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="font-bold focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
