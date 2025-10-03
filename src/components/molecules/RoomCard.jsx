import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const RoomCard = ({ room, onClick }) => {
const statusConfig = {
    available: { bg: "bg-gradient-to-br from-success/20 to-green-100", border: "border-success" },
    occupied: { bg: "bg-gradient-to-br from-accent/20 to-blue-100", border: "border-accent" },
    cleaning: { bg: "bg-gradient-to-br from-warning/20 to-yellow-100", border: "border-warning" },
    maintenance: { bg: "bg-gradient-to-br from-error/20 to-red-100", border: "border-error" }
  };

const config = statusConfig[room.status_c] || statusConfig.available;

  return (
    <Card 
      hover 
      onClick={onClick}
      className={cn("p-4 border-2 cursor-pointer", config.bg, config.border)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
<h3 className="text-2xl font-bold text-primary">{room.room_number_c}</h3>
<p className="text-sm text-gray-600">{room.type_c}</p>
        </div>
<Badge variant={room.status_c}>
          {room.status_c}
        </Badge>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
        <div className="flex items-center space-x-1">
          <ApperIcon name="Users" size={16} />
<span>{room.capacity_c}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ApperIcon name="DollarSign" size={16} />
<span>${room.base_rate_c}</span>
        </div>
      </div>

{room.status_c === "occupied" && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">Currently occupied</p>
        </div>
      )}
    </Card>
  );
};

export default RoomCard;