import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QuickActionsBar = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "New Booking",
      icon: "Plus",
      color: "from-accent to-blue-600",
      onClick: () => navigate("/bookings")
    },
    {
      label: "Check-in",
      icon: "UserCheck",
      color: "from-success to-green-600",
      onClick: () => navigate("/bookings")
    },
    {
      label: "Check-out",
      icon: "UserMinus",
      color: "from-warning to-yellow-600",
      onClick: () => navigate("/bookings")
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Quick Actions
          </h2>
          <p className="text-sm text-gray-500 mt-1">Common tasks at your fingertips</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-secondary to-yellow-600">
          <ApperIcon name="Zap" size={24} className="text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`p-6 rounded-lg bg-gradient-to-br ${action.color} hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex flex-col items-center space-y-3`}
          >
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <ApperIcon name={action.icon} size={28} className="text-white" />
            </div>
            <span className="text-white font-semibold text-lg">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActionsBar;