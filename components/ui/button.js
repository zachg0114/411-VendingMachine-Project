import React from "react";

export function Button({ children, variant = "default", size = "md", className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500",
    primary: "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400",
    destructive: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-400",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
