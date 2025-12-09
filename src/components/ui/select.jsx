// src/components/ui/select.jsx
"use client";
import * as React from "react";

/*
  This Select component keeps a native <select> for accessibility,
  but allows using helper subcomponents like <SelectTrigger> and <SelectItem>.
  - It takes either onChange (e) => {} or onValueChange (value) => {}.
  - It will render the first SelectTrigger child as the visible trigger area (above the select).
  - All SelectItem children will be rendered as <option> inside the native select.
*/

export function Select({ value, onChange, onValueChange, children, className = "", ...props }) {
  const childArray = React.Children.toArray(children);

  // Find any SelectTrigger child (render externally)
  const triggerChild = childArray.find((c) => c?.type?.displayName === "SelectTrigger");
  // Find SelectItem children
  const itemChildren = childArray.filter((c) => c?.type?.displayName === "SelectItem");

  function handleChange(e) {
    onChange?.(e);
    onValueChange?.(e.target.value);
  }

  return (
    <div className={`relative ${className}`}>
      {/* Render trigger (if any) above the native select */}
      {triggerChild && triggerChild.props?.children}

      <select
        value={value}
        onChange={handleChange}
        className="rounded-xl px-3 py-2 bg-white border border-gray-300 text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none w-full"
        {...props}
      >
        {itemChildren.length > 0
          ? itemChildren.map((child, idx) => (
              <option key={idx} value={child.props.value}>
                {child.props.children}
              </option>
            ))
          : // fallback: if no SelectItem children, try to render raw children that are <option>
            childArray.map((c, i) => c && c.type === "option" ? React.cloneElement(c, { key: i }) : null)}
      </select>
    </div>
  );
}

export function SelectTrigger({ children }) {
  // mark displayName so Select can detect it
  return <div className="inline-flex items-center gap-2">{children}</div>;
}
SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({ value, placeholder = "Select…" }) {
  return <span className="text-gray-700">{value || placeholder}</span>;
}

export function SelectContent({ children, className = "" }) {
  return <div className={`mt-1 space-y-1 ${className}`}>{children}</div>;
}
SelectContent.displayName = "SelectContent";

export function SelectItem({ value, children }) {
  // mark displayName to be filtered
  return <>{children}</>;
}
SelectItem.displayName = "SelectItem";
