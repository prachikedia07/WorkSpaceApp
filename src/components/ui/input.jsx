// import React from "react";

// export function Input({ className = "", ...props }) {
//   return (
//     <input
//       className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${className}`}
//       {...props}
//     />
//   );
// }

import React from "react";
import { cn } from "./utils";

export function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition",
        className
      )}
      {...props}
    />
  );
}
