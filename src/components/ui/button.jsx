"use client";
import React from "react";
import { cn } from "./utils";

export function Button({ className, variant, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
        variant === "outline"
          ? "border border-gray-300 bg-transparent hover:bg-gray-100"
          : "bg-teal-600 hover:bg-teal-700 text-white",
        className
      )}
      {...props}
    />
  );
}
