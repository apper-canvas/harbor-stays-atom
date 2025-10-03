import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import guestService from "@/services/api/guestService";

const GuestFormModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name_c: "",
    last_name_c: "",
    email_c: "",
    phone_c: "",
    id_type_c: "Passport",
    id_number_c: "",
    address_c: "",
    preferences_c: "",
    vip_status_c: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.first_name_c || !formData.last_name_c || !formData.email_c || !formData.phone_c) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const result = await guestService.create(formData);
      if (result) {
        toast.success("Guest created successfully");
        setFormData({
          first_name_c: "",
          last_name_c: "",
          email_c: "",
          phone_c: "",
          id_type_c: "Passport",
          id_number_c: "",
          address_c: "",
          preferences_c: "",
          vip_status_c: false
        });
        onClose(true);
      }
    } catch (error) {
      toast.error("Failed to create guest");
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
                <ApperIcon name="UserPlus" size={24} />
              </div>
              <h2 className="text-2xl font-bold">Add New Guest</h2>
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
                First Name <span className="text-error">*</span>
              </label>
              <Input
                type="text"
                name="first_name_c"
                value={formData.first_name_c}
                onChange={handleChange}
                placeholder="e.g., John"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-error">*</span>
              </label>
              <Input
                type="text"
                name="last_name_c"
                value={formData.last_name_c}
                onChange={handleChange}
                placeholder="e.g., Doe"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-error">*</span>
              </label>
              <Input
                type="email"
                name="email_c"
                value={formData.email_c}
                onChange={handleChange}
                placeholder="e.g., john.doe@email.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-error">*</span>
              </label>
              <Input
                type="tel"
                name="phone_c"
                value={formData.phone_c}
                onChange={handleChange}
                placeholder="e.g., +1234567890"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Type
              </label>
              <select
                name="id_type_c"
                value={formData.id_type_c}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                disabled={loading}
              >
                <option value="Passport">Passport</option>
                <option value="Driver License">Driver License</option>
                <option value="National ID">National ID</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ID Number
              </label>
              <Input
                type="text"
                name="id_number_c"
                value={formData.id_number_c}
                onChange={handleChange}
                placeholder="e.g., AB123456"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address_c"
              value={formData.address_c}
              onChange={handleChange}
              placeholder="Full address"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferences
            </label>
            <textarea
              name="preferences_c"
              value={formData.preferences_c}
              onChange={handleChange}
              placeholder="e.g., Non-smoking, High floor, King bed"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="vip_status_c"
              id="vip_status"
              checked={formData.vip_status_c}
              onChange={handleChange}
              className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
              disabled={loading}
            />
            <label htmlFor="vip_status" className="text-sm font-medium text-gray-700">
              VIP Status
            </label>
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
                  <ApperIcon name="UserPlus" size={18} className="mr-2" />
                  Create Guest
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestFormModal;