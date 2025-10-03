import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ title, onMenuClick, action }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="Menu" size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        {action && (
          <Button variant="primary" onClick={action.onClick}>
            <ApperIcon name={action.icon} size={18} className="mr-2" />
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;