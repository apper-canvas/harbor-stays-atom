import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Empty from "@/components/ui/Empty";
import { format } from "date-fns";

const UpcomingBookingsList = ({ bookings }) => {
  if (bookings.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Upcoming Bookings
          </h2>
          <div className="p-3 rounded-lg bg-gradient-to-br from-success to-green-600">
            <ApperIcon name="Calendar" size={24} className="text-white" />
          </div>
        </div>
        <Empty message="No upcoming bookings" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Upcoming Bookings
          </h2>
          <p className="text-sm text-gray-500 mt-1">{bookings.length} reservations</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-success to-green-600">
          <ApperIcon name="Calendar" size={24} className="text-white" />
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {bookings.map(booking => (
          <div
            key={booking.Id}
            className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-white">
                <ApperIcon name="User" size={20} className="text-accent" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{booking.guestName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-600">Room {booking.roomNumber}</span>
                  <span className="text-gray-400">•</span>
                  <Badge variant="info" size="sm">{booking.roomType}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-gray-600">
                <ApperIcon name="CalendarDays" size={16} />
                <span className="text-sm font-medium">
{booking.checkIn ? format(new Date(booking.checkIn), 'MMM dd') : "N/A"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {booking.numberOfGuests} {booking.numberOfGuests === 1 ? 'guest' : 'guests'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingBookingsList;