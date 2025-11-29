"use client";
import React from "react";

export function Avatar({ children, ...props }) {
  return (
    <div
      {...props}
      className={`relative flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md overflow-hidden border border-gray-100 ${props.className || ""}`}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src = "", alt = "Avatar", ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover w-full h-full rounded-full ${props.className || ""}`}
      {...props}
    />
  );
}

export function AvatarFallback({ children, ...props }) {
  return (
    <div
      {...props}
      className={`absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white text-lg font-semibold ${props.className || ""}`}
    >
      {children}
    </div>
  );
}
