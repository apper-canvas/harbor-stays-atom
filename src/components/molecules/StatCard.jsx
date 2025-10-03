import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const StatCard = ({ title, value, icon, trend, trendValue, color = "accent" }) => {
  // Ensure color exists in colorClasses, fallback to accent
const colorClasses = {
    accent: {
      gradient: "from-accent to-blue-600",
      bg: "bg-accent",
      border: "border-accent"
    },
    success: {
      gradient: "from-success to-green-600",
      bg: "bg-success",
      border: "border-success"
    },
    warning: {
      gradient: "from-warning to-yellow-600",
      bg: "bg-warning",
      border: "border-warning"
    },
    error: {
      gradient: "from-error to-red-600",
      bg: "bg-error",
      border: "border-error"
    },
    secondary: {
      gradient: "from-secondary to-yellow-600",
      bg: "bg-secondary",
      border: "border-secondary"
    }
  };
  const safeColor = color && colorClasses[color] ? color : "accent";

  return (
<Card hover className={cn("p-6 border-l-4", (colorClasses[safeColor] || colorClasses.accent).border, "relative overflow-hidden")}>
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</span>
<div className={cn(
          "p-3 rounded-xl shadow-lg transition-all duration-300",
          (colorClasses[safeColor] || colorClasses.accent).bg,
          "hover:scale-110"
        )}>
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-4xl font-bold text-gray-900 mb-1 tracking-tight">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center mt-3 space-x-1.5">
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                size={18} 
                className={cn(
                  "transition-colors",
                  trend === "up" ? "text-success" : "text-error"
                )}
              />
              <span className={cn(
                "text-sm font-semibold",
                trend === "up" ? "text-success" : "text-error"
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;