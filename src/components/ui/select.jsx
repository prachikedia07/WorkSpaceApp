"use client";
import * as React from "react";

export function Select({ value, onChange, children, className = "", ...props }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`rounded-xl px-3 py-2 bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className = "", ...props }) {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SelectValue({ value, placeholder = "Select…" }) {
  return (
    <span className="text-gray-700">{value || placeholder}</span>
  );
}

export function SelectContent({ children, className = "" }) {
  return <div className={`mt-1 space-y-1 ${className}`}>{children}</div>;
}

export function SelectItem({ value, children }) {
  return (
    <option value={value}>
      {children}
    </option>
  );
}
