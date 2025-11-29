// import React from "react";

// export function Label({ htmlFor, children }) {
//   return (
//     <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
//       {children}
//     </label>
//   );
// }

import React from "react";
import { cn } from "./utils";

export function Label({ className, ...props }) {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-gray-700 mb-1",
        className
      )}
      {...props}
    />
  );
}

