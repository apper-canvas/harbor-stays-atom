import { toast } from "react-toastify";

const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = "booking_c";

const bookingService = {
  getAll: async () => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "guest_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "room_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "number_of_guests_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "special_requests_c"}},
          {"field": {"Name": "payment_status_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching bookings:", error?.response?.data?.message || error);
      toast.error("Failed to load bookings");
      return [];
    }
  },

  getById: async (id) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "guest_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "room_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "number_of_guests_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "special_requests_c"}},
          {"field": {"Name": "payment_status_c"}},
          {"field": {"Name": "created_at_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  getByStatus: async (status) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "guest_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "room_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "number_of_guests_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "special_requests_c"}},
          {"field": {"Name": "payment_status_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [{"FieldName": "status_c", "Operator": "EqualTo", "Values": [status]}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching bookings by status:", error?.response?.data?.message || error);
      return [];
    }
  },

  getByGuest: async (guestId) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "guest_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "room_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "number_of_guests_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "special_requests_c"}},
          {"field": {"Name": "payment_status_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [{"FieldName": "guest_id_c", "Operator": "EqualTo", "Values": [parseInt(guestId)]}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching bookings by guest:", error?.response?.data?.message || error);
      return [];
    }
  },

  getByDateRange: async (startDate, endDate) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "guest_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "room_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "number_of_guests_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "special_requests_c"}},
          {"field": {"Name": "payment_status_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {"fieldName": "check_in_c", "operator": "GreaterThanOrEqualTo", "values": [startDate]},
                {"fieldName": "check_in_c", "operator": "LessThanOrEqualTo", "values": [endDate]}
              ],
              operator: "AND"
            },
            {
              conditions: [
                {"fieldName": "check_out_c", "operator": "GreaterThanOrEqualTo", "values": [startDate]},
                {"fieldName": "check_out_c", "operator": "LessThanOrEqualTo", "values": [endDate]}
              ],
              operator: "AND"
            }
          ]
        }]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching bookings by date range:", error?.response?.data?.message || error);
      return [];
    }
  },

  getTodayArrivals: async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "guest_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "room_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "number_of_guests_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "special_requests_c"}},
          {"field": {"Name": "payment_status_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [
          {"FieldName": "check_in_c", "Operator": "EqualTo", "Values": [today]},
          {"FieldName": "status_c", "Operator": "EqualTo", "Values": ["confirmed"]}
        ]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching today's arrivals:", error?.response?.data?.message || error);
      return [];
    }
  },

  getTodayDepartures: async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "guest_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "room_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "check_in_c"}},
          {"field": {"Name": "check_out_c"}},
          {"field": {"Name": "number_of_guests_c"}},
          {"field": {"Name": "total_amount_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "special_requests_c"}},
          {"field": {"Name": "payment_status_c"}},
          {"field": {"Name": "created_at_c"}}
        ],
        where: [
          {"FieldName": "check_out_c", "Operator": "EqualTo", "Values": [today]},
          {"FieldName": "status_c", "Operator": "EqualTo", "Values": ["checked-in"]}
        ]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching today's departures:", error?.response?.data?.message || error);
      return [];
    }
  },

  create: async (booking) => {
    try {
      const params = {
        records: [{
          Name: `Booking - ${booking.guest_id_c}`,
          guest_id_c: parseInt(booking.guest_id_c),
          room_id_c: parseInt(booking.room_id_c),
          check_in_c: booking.check_in_c,
          check_out_c: booking.check_out_c,
          number_of_guests_c: parseInt(booking.number_of_guests_c),
          total_amount_c: parseFloat(booking.total_amount_c),
          status_c: booking.status_c || "confirmed",
          special_requests_c: booking.special_requests_c || "",
          payment_status_c: booking.payment_status_c || "pending",
          created_at_c: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.createRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create booking:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating booking:", error?.response?.data?.message || error);
      toast.error("Failed to create booking");
      return null;
    }
  },

  update: async (id, data) => {
    try {
      const updateData = {
        Id: parseInt(id)
      };
      
      if (data.Name !== undefined) updateData.Name = data.Name;
      if (data.guest_id_c !== undefined) updateData.guest_id_c = parseInt(data.guest_id_c);
      if (data.room_id_c !== undefined) updateData.room_id_c = parseInt(data.room_id_c);
      if (data.check_in_c !== undefined) updateData.check_in_c = data.check_in_c;
      if (data.check_out_c !== undefined) updateData.check_out_c = data.check_out_c;
      if (data.number_of_guests_c !== undefined) updateData.number_of_guests_c = parseInt(data.number_of_guests_c);
      if (data.total_amount_c !== undefined) updateData.total_amount_c = parseFloat(data.total_amount_c);
      if (data.status_c !== undefined) updateData.status_c = data.status_c;
      if (data.special_requests_c !== undefined) updateData.special_requests_c = data.special_requests_c;
      if (data.payment_status_c !== undefined) updateData.payment_status_c = data.payment_status_c;
      if (data.created_at_c !== undefined) updateData.created_at_c = data.created_at_c;
      
      const params = { records: [updateData] };
      
      const response = await apperClient.updateRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update booking:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating booking:", error?.response?.data?.message || error);
      toast.error("Failed to update booking");
      return null;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const updateData = {
        Id: parseInt(id),
        status_c: status
      };
      
      const params = { records: [updateData] };
      
      const response = await apperClient.updateRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update booking status:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating booking status:", error?.response?.data?.message || error);
      toast.error("Failed to update booking status");
      return null;
    }
  },

  delete: async (id) => {
    try {
      const params = { RecordIds: [parseInt(id)] };
      
      const response = await apperClient.deleteRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete booking:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting booking:", error?.response?.data?.message || error);
      toast.error("Failed to delete booking");
      return false;
    }
  },

  checkIn: async (id) => {
    return await bookingService.updateStatus(id, "checked-in");
  },

  checkOut: async (id) => {
    return await bookingService.updateStatus(id, "checked-out");
  },

  cancel: async (id) => {
    return await bookingService.updateStatus(id, "cancelled");
  },

  getRecentActivity: async () => {
    try {
      const allBookings = await bookingService.getAll();
      
      const activities = [];
      const now = new Date();
      const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
      
      allBookings.forEach(booking => {
        const checkIn = new Date(booking.check_in_c);
        const checkOut = new Date(booking.check_out_c);
        
        if (checkIn <= now && checkIn >= sevenDaysAgo) {
          activities.push({
            Id: `checkin-${booking.Id}`,
            type: 'checkin',
            booking: booking,
            timestamp: booking.check_in_c,
            description: `${booking.guest_id_c?.Name || 'Guest'} checked in to ${booking.room_id_c?.Name || 'Room'}`
          });
        }
        
        if (checkOut <= now && checkOut >= sevenDaysAgo) {
          activities.push({
            Id: `checkout-${booking.Id}`,
            type: 'checkout',
            booking: booking,
            timestamp: booking.check_out_c,
            description: `${booking.guest_id_c?.Name || 'Guest'} checked out from ${booking.room_id_c?.Name || 'Room'}`
          });
        }
        
        if (booking.status_c === 'confirmed' && checkIn > now) {
          activities.push({
            Id: `new-${booking.Id}`,
            type: 'new_booking',
            booking: booking,
            timestamp: booking.check_in_c,
            description: `New booking created for ${booking.guest_id_c?.Name || 'Guest'}`
          });
        }
      });
      
      return activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    } catch (error) {
      console.error("Error fetching recent activity:", error?.response?.data?.message || error);
      return [];
    }
  },

  getUpcomingBookings: async () => {
    try {
      const allBookings = await bookingService.getAll();
      const now = new Date();
      
      return allBookings
        .filter(b => new Date(b.check_in_c) > now)
        .sort((a, b) => new Date(a.check_in_c) - new Date(b.check_in_c))
        .slice(0, 10);
    } catch (error) {
      console.error("Error fetching upcoming bookings:", error?.response?.data?.message || error);
      return [];
    }
  }
};

export default bookingService;