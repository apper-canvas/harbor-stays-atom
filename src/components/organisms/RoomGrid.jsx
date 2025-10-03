import React from "react";
import RoomCard from "@/components/molecules/RoomCard";

const RoomGrid = ({ rooms, onRoomClick }) => {
  const floors = [...new Set(rooms.map(r => r.floor))].sort();

  return (
    <div className="space-y-8">
      {floors.map(floor => {
        const floorRooms = rooms.filter(r => r.floor === floor);
        return (
          <div key={floor}>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center space-x-2">
              <span>Floor {floor}</span>
              <span className="text-sm font-normal text-gray-500">({floorRooms.length} rooms)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {floorRooms.map(room => (
                <RoomCard 
                  key={room.Id} 
                  room={room} 
                  onClick={() => onRoomClick(room)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomGrid;