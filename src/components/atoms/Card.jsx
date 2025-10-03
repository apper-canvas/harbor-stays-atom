import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  children, 
  className,
  hover = false,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ease-out";
  const hoverStyles = hover ? "hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1" : "";

  return (
    <div
      ref={ref}
      className={cn(baseStyles, hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;