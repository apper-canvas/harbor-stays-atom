import React from "react";
import { format, parseISO } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const BookingListItem = ({ booking, guest, room, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-accent hover:shadow-md transition-all duration-200 cursor-pointer"
    >
<div className="flex items-center space-x-4 flex-1">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white font-bold">
          {room?.room_number_c || booking?.room_id_c?.Name || "N/A"}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">
{guest ? `${guest.first_name_c} ${guest.last_name_c}` : (booking.guest_id_c?.Name || "Guest")}
          </h4>
          <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" size={14} />
<span>{format(parseISO(booking.check_in_c), "MMM dd")} - {format(parseISO(booking.check_out_c), "MMM dd")}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Users" size={14} />
<span>{booking.number_of_guests_c} guests</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
${booking.total_amount_c}
          </p>
          <p className="text-xs text-gray-500">{booking.paymentStatus}</p>
</div>
        <Badge variant={booking.status}>
{booking.status_c}
        </Badge>
      </div>
    </div>
  );
};

export default BookingListItem;