import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import { format, parseISO } from "date-fns";

const TodayOperations = ({ arrivals, departures, guests, rooms }) => {
const getGuestName = (guestId) => {
    const guest = guests.find(g => g.Id === (guestId?.Id || guestId));
    return guest ? `${guest.first_name_c} ${guest.last_name_c}` : (guestId?.Name || "Guest");
  };

  const getRoomNumber = (roomId) => {
    const room = rooms.find(r => r.Id === roomId);
    return room ? room.roomNumber : "N/A";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <ApperIcon name="LogIn" size={20} className="text-success" />
            <span>Today's Arrivals</span>
          </h3>
          <Badge variant="confirmed">{arrivals.length}</Badge>
        </div>
        
        {arrivals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ApperIcon name="Calendar" size={32} className="mx-auto mb-2 text-gray-400" />
            <p>No arrivals today</p>
          </div>
        ) : (
          <div className="space-y-3">
            {arrivals.slice(0, 5).map(booking => (
<div key={booking.Id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-success to-green-600 flex items-center justify-center text-white font-bold">
                    {getRoomNumber(booking.room_id_c)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{getGuestName(booking.guest_id_c)}</p>
                    <p className="text-sm text-gray-600">{booking.number_of_guests_c} guests</p>
                  </div>
                </div>
                <Badge variant="confirmed">Arriving</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
            <ApperIcon name="LogOut" size={20} className="text-warning" />
            <span>Today's Departures</span>
          </h3>
          <Badge variant="warning">{departures.length}</Badge>
        </div>
        
        {departures.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ApperIcon name="Calendar" size={32} className="mx-auto mb-2 text-gray-400" />
            <p>No departures today</p>
          </div>
        ) : (
          <div className="space-y-3">
{departures.slice(0, 5).map(booking => (
              <div key={booking.Id} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-warning to-yellow-600 flex items-center justify-center text-white font-bold">
                    {getRoomNumber(booking.room_id_c)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{getGuestName(booking.guest_id_c)}</p>
                    <p className="text-sm text-gray-600">{booking.number_of_guests_c} guests</p>
                  </div>
                </div>
                <Badge variant="warning">Departing</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TodayOperations;