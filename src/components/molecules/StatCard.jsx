import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const StatCard = ({ title, value, icon, trend, trendValue, color = "accent" }) => {
  const colorClasses = {
    accent: "from-accent to-blue-600",
    success: "from-success to-green-600",
    warning: "from-warning to-yellow-600",
    error: "from-error to-red-600",
    secondary: "from-secondary to-yellow-600"
  };

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className={cn("p-3 rounded-lg bg-gradient-to-br", colorClasses[color], "bg-opacity-10")}>
          <ApperIcon name={icon} size={24} className="text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {value}
          </h3>
          {trend && (
            <div className="flex items-center mt-2 space-x-1">
              <ApperIcon 
                name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
                size={16} 
                className={trend === "up" ? "text-success" : "text-error"}
              />
              <span className={cn(
                "text-sm font-medium",
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