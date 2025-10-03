import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { format, parseISO } from "date-fns";

const RoomDetailsModal = ({ isOpen, onClose, room, onStatusChange }) => {
  if (!isOpen || !room) return null;

  const statusActions = {
    available: [
      { status: "occupied", label: "Mark as Occupied", icon: "User" },
      { status: "cleaning", label: "Mark for Cleaning", icon: "Sparkles" },
      { status: "maintenance", label: "Mark for Maintenance", icon: "AlertCircle" }
    ],
    occupied: [
      { status: "cleaning", label: "Check Out & Clean", icon: "LogOut" }
    ],
    cleaning: [
      { status: "available", label: "Mark as Available", icon: "CheckCircle" }
    ],
    maintenance: [
      { status: "available", label: "Mark as Fixed", icon: "CheckCircle" }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-primary">Room {room.roomNumber}</h2>
              <p className="text-gray-600">{room.type}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Badge variant={room.status} className="text-base px-4 py-2">
                {room.status}
              </Badge>
              <span className="text-sm text-gray-600">
                Floor {room.floor}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="Users" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Capacity</span>
                </div>
                <p className="text-2xl font-bold text-primary">{room.capacity}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="DollarSign" size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600">Base Rate</span>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-secondary to-yellow-600 bg-clip-text text-transparent">
                  ${room.baseRate}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <ApperIcon name="Sparkles" size={18} />
                <span>Amenities</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Clock" size={18} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Last Cleaned</span>
              </div>
              <p className="text-gray-700">
                {format(parseISO(room.lastCleaned), "PPpp")}
              </p>
            </div>

            {room.notes && (
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <ApperIcon name="FileText" size={18} className="text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Notes</span>
                </div>
                <p className="text-gray-700">{room.notes}</p>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Change Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {statusActions[room.status]?.map((action) => (
                  <Button
                    key={action.status}
                    variant="outline"
                    onClick={() => onStatusChange(room.Id, action.status)}
                    className="w-full justify-start"
                  >
                    <ApperIcon name={action.icon} size={18} className="mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RoomDetailsModal;