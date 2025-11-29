"use client";
import React, { useState } from "react";
import { cn } from "./utils";

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { activeTab, setActiveTab })
  );
}

export function TabsList({ children, activeTab, setActiveTab }) {
  return (
    <div className="flex bg-gray-100 rounded-full p-1">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "flex-1 text-sm px-1 py-2 rounded-md transition",
        isActive ? "bg-teal-500 text-white" : "hover:bg-gray-200"
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, activeTab }) {
  return activeTab === value ? <div className="mt-4">{children}</div> : null;
}
