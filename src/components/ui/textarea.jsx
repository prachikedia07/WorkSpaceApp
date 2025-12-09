//src/components/ui/textarea.jsx
import React from "react";
import { cn } from "./utils";

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition resize-none",
        className
      )}
      {...props}
    />
  );
}
