import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  children, 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    available: "bg-gradient-to-r from-success to-green-600 text-white",
    occupied: "bg-gradient-to-r from-accent to-blue-600 text-white",
    cleaning: "bg-gradient-to-r from-warning to-yellow-600 text-white",
    maintenance: "bg-gradient-to-r from-error to-red-600 text-white",
    confirmed: "bg-gradient-to-r from-info to-cyan-600 text-white",
    "checked-in": "bg-gradient-to-r from-success to-green-600 text-white",
    "checked-out": "bg-gray-400 text-white",
    cancelled: "bg-gradient-to-r from-error to-red-600 text-white",
    vip: "bg-gradient-to-r from-secondary to-yellow-600 text-white"
  };

  return (
    <span
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;