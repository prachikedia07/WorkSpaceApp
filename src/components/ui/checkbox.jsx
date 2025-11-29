import React from "react";

export function Checkbox({ id, className = "", ...props }) {
  return (
    <input
      id={id}
      type="checkbox"
      className={`w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 ${className}`}
      {...props}
    />
  );
}
