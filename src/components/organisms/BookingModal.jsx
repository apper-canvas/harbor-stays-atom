import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";

const BookingModal = ({ isOpen, onClose, onSubmit, guests, rooms, editBooking = null }) => {
  const [formData, setFormData] = useState({
    guest_id_c: "",
    room_id_c: "",
    check_in_c: "",
    check_out_c: "",
    number_of_guests_c: 1,
    special_requests_c: "",
    payment_status_c: "pending"
  });

  useEffect(() => {
    if (editBooking) {
      setFormData(editBooking);
    }
  }, [editBooking]);

const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRoom = rooms.find(r => r.Id === parseInt(formData.room_id_c));
    const nights = Math.ceil((new Date(formData.check_out_c) - new Date(formData.check_in_c)) / (1000 * 60 * 60 * 24));
    const totalAmount = selectedRoom ? selectedRoom.base_rate_c * nights : 0;
    
    onSubmit({
      ...formData,
      guest_id_c: parseInt(formData.guest_id_c),
      room_id_c: parseInt(formData.room_id_c),
      number_of_guests_c: parseInt(formData.number_of_guests_c),
      total_amount_c: totalAmount
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

const availableRooms = rooms.filter(r => r.status_c === "available" || r.Id === formData.room_id_c);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {editBooking ? "Edit Booking" : "New Booking"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guest
                </label>
                <select
value={formData.guest_id_c}
                  onChange={(e) => handleChange("guest_id_c", e.target.value)}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                >
                  <option value="">Select Guest</option>
                  {guests.map(guest => (
<option key={guest.Id} value={guest.Id}>
                      {guest.first_name_c} {guest.last_name_c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room
                </label>
                <select
value={formData.room_id_c}
                  onChange={(e) => handleChange("room_id_c", e.target.value)}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                >
                  <option value="">Select Room</option>
{availableRooms.map(room => (
                    <option key={room.Id} value={room.Id}>
                      {room.room_number_c} - {room.type_c} (${room.base_rate_c}/night)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date
                </label>
                <Input
                  type="date"
value={formData.check_in_c}
                  onChange={(e) => handleChange("check_in_c", e.target.value)}
                  required
                />
              </div>

              <div>
<label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date
                </label>
                <Input
type="date"
                  value={formData.check_out_c}
                  onChange={(e) => handleChange("check_out_c", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests
                </label>
                <Input
                  type="number"
                  min="1"
value={formData.number_of_guests_c}
                  onChange={(e) => handleChange("number_of_guests_c", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Status
                </label>
                <select
value={formData.payment_status_c}
                  onChange={(e) => handleChange("payment_status_c", e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                >
                  <option value="pending">Pending</option>
                  <option value="partial">Partial</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
value={formData.special_requests_c}
                onChange={(e) => handleChange("special_requests_c", e.target.value)}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                placeholder="Any special requests..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editBooking ? "Update Booking" : "Create Booking"}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default BookingModal;