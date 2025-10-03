import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import roomService from "@/services/api/roomService";

const RoomFormModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    room_number_c: "",
    Name: "",
    type_c: "Standard",
    floor_c: "",
    capacity_c: "",
    amenities_c: "",
    base_rate_c: "",
    status_c: "available",
    notes_c: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.room_number_c || !formData.floor_c || !formData.capacity_c || !formData.base_rate_c) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const result = await roomService.create(formData);
      if (result) {
        toast.success("Room created successfully");
        setFormData({
          room_number_c: "",
          Name: "",
          type_c: "Standard",
          floor_c: "",
          capacity_c: "",
          amenities_c: "",
          base_rate_c: "",
          status_c: "available",
          notes_c: ""
        });
        onClose(true);
      }
    } catch (error) {
      toast.error("Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-primary to-accent text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <ApperIcon name="Plus" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Add New Room</h2>
            </div>
            <button
              onClick={() => onClose(false)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              disabled={loading}
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Number <span className="text-error">*</span>
              </label>
              <Input
                type="text"
                name="room_number_c"
                value={formData.room_number_c}
                onChange={handleChange}
                placeholder="e.g., 101"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Name (Optional)
              </label>
              <Input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="e.g., Deluxe Ocean View"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Type <span className="text-error">*</span>
              </label>
              <select
                name="type_c"
                value={formData.type_c}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                disabled={loading}
              >
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="Presidential">Presidential</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Floor <span className="text-error">*</span>
              </label>
              <Input
                type="number"
                name="floor_c"
                value={formData.floor_c}
                onChange={handleChange}
                placeholder="e.g., 1"
                required
                min="1"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity <span className="text-error">*</span>
              </label>
              <Input
                type="number"
                name="capacity_c"
                value={formData.capacity_c}
                onChange={handleChange}
                placeholder="e.g., 2"
                required
                min="1"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Rate ($) <span className="text-error">*</span>
              </label>
              <Input
                type="number"
                name="base_rate_c"
                value={formData.base_rate_c}
                onChange={handleChange}
                placeholder="e.g., 150.00"
                required
                min="0"
                step="0.01"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Status
              </label>
              <select
                name="status_c"
                value={formData.status_c}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                disabled={loading}
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <textarea
              name="amenities_c"
              value={formData.amenities_c}
              onChange={handleChange}
              placeholder="e.g., WiFi, TV, Mini Bar, Balcony"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes_c"
              value={formData.notes_c}
              onChange={handleChange}
              placeholder="Additional notes about the room"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false)}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" size={18} className="mr-2" />
                  Create Room
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomFormModal;