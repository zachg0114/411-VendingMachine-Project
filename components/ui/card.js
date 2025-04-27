import React from "react";

export function Card({ children, className = "", ...props }) {
  const classes = `rounded-lg shadow-md border border-gray-700 p-4 ${className}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "", ...props }) {
  const classes = `p-4 ${className}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
