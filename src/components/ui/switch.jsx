"use client";
import React from "react";

export function Switch({ checked = false, onChange }) {
  return (
    <button
      onClick={() => onChange && onChange(!checked)}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
        checked ? "bg-teal-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          checked ? "translate-x-5" : ""
        }`}
      ></div>
    </button>
  );
}
