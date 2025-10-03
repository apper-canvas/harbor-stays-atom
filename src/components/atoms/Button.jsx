import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md",
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent to-blue-600 text-white hover:shadow-lg hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary to-yellow-600 text-white hover:shadow-lg hover:scale-105",
    outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
    ghost: "text-gray-600 hover:bg-gray-100",
    danger: "bg-gradient-to-r from-error to-red-700 text-white hover:shadow-lg hover:scale-105"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;