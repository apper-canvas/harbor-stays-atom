import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  message = "No data available", 
  description = "Get started by adding your first item",
  actionLabel,
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-full p-6 mb-6">
        <ApperIcon name={icon} size={48} className="text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <ApperIcon name="Plus" size={18} />
          <span className="font-medium">{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default Empty;