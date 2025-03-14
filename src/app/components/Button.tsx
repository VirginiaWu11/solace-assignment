import React from "react";

export default function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className="rounded-md bg-solace-green-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-solace-green-600 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-solace-green-600 active:bg-solace-green-700 transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
