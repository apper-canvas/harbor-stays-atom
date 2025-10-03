import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-2 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20";
  const errorStyles = error ? "border-error focus:border-error" : "border-gray-300 focus:border-accent";

  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseStyles, errorStyles, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;