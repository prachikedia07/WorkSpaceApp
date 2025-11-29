import React from "react";
import { cn } from "./utils";

export function Badge({ className, children, variant = "default", ...props }) {
  const variants = {
    default:
      "bg-teal-50 text-teal-700 border border-transparent hover:bg-teal-100",
    secondary:
      "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200",
    destructive: "bg-red-100 text-red-700 border border-red-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium transition-all",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
