import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-gradient-to-br from-error/10 to-error/5 rounded-full p-6 mb-6">
        <ApperIcon name="AlertCircle" size={48} className="text-error" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <ApperIcon name="RefreshCw" size={18} />
          <span className="font-medium">Try Again</span>
        </button>
      )}
    </div>
  );
};

export default Error;