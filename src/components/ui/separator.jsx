// export function Separator({ className = "" }) {
//   return <div className={`h-px bg-gray-300 w-full ${className}`} />;
// }

import React from "react";
import { cn } from "./utils";

export function Separator({ className }) {
  return (
    <hr className={cn("border-gray-200 my-4", className)} />
  );
}
