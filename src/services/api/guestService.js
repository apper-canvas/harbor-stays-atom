import { toast } from "react-toastify";

const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = "guest_c";

const guestService = {
  getAll: async () => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "id_type_c"}},
          {"field": {"Name": "id_number_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "preferences_c"}},
          {"field": {"Name": "vip_status_c"}},
          {"field": {"Name": "booking_history_c"}}
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
      console.error("Error fetching guests:", error?.response?.data?.message || error);
      toast.error("Failed to load guests");
      return [];
    }
  },

  getById: async (id) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "id_type_c"}},
          {"field": {"Name": "id_number_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "preferences_c"}},
          {"field": {"Name": "vip_status_c"}},
          {"field": {"Name": "booking_history_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching guest ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  search: async (query) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "id_type_c"}},
          {"field": {"Name": "id_number_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "preferences_c"}},
          {"field": {"Name": "vip_status_c"}},
          {"field": {"Name": "booking_history_c"}}
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {"fieldName": "first_name_c", "operator": "Contains", "values": [query]},
                {"fieldName": "last_name_c", "operator": "Contains", "values": [query]},
                {"fieldName": "email_c", "operator": "Contains", "values": [query]},
                {"fieldName": "phone_c", "operator": "Contains", "values": [query]}
              ],
              operator: "OR"
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
      console.error("Error searching guests:", error?.response?.data?.message || error);
      return [];
    }
  },

  getVIPGuests: async () => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "id_type_c"}},
          {"field": {"Name": "id_number_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "preferences_c"}},
          {"field": {"Name": "vip_status_c"}},
          {"field": {"Name": "booking_history_c"}}
        ],
        where: [{"FieldName": "vip_status_c", "Operator": "EqualTo", "Values": [true]}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching VIP guests:", error?.response?.data?.message || error);
      return [];
    }
  },

  create: async (guest) => {
    try {
      const params = {
        records: [{
          Name: `${guest.first_name_c} ${guest.last_name_c}`,
          first_name_c: guest.first_name_c,
          last_name_c: guest.last_name_c,
          email_c: guest.email_c,
          phone_c: guest.phone_c,
          id_type_c: guest.id_type_c || "",
          id_number_c: guest.id_number_c || "",
          address_c: guest.address_c || "",
          preferences_c: guest.preferences_c || "",
          vip_status_c: guest.vip_status_c || false,
          booking_history_c: guest.booking_history_c || ""
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
          console.error(`Failed to create guest:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating guest:", error?.response?.data?.message || error);
      toast.error("Failed to create guest");
      return null;
    }
  },

  update: async (id, data) => {
    try {
      const updateData = {
        Id: parseInt(id)
      };
      
      if (data.Name !== undefined) updateData.Name = data.Name;
      if (data.first_name_c !== undefined) updateData.first_name_c = data.first_name_c;
      if (data.last_name_c !== undefined) updateData.last_name_c = data.last_name_c;
      if (data.email_c !== undefined) updateData.email_c = data.email_c;
      if (data.phone_c !== undefined) updateData.phone_c = data.phone_c;
      if (data.id_type_c !== undefined) updateData.id_type_c = data.id_type_c;
      if (data.id_number_c !== undefined) updateData.id_number_c = data.id_number_c;
      if (data.address_c !== undefined) updateData.address_c = data.address_c;
      if (data.preferences_c !== undefined) updateData.preferences_c = data.preferences_c;
      if (data.vip_status_c !== undefined) updateData.vip_status_c = data.vip_status_c;
      if (data.booking_history_c !== undefined) updateData.booking_history_c = data.booking_history_c;
      
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
          console.error(`Failed to update guest:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating guest:", error?.response?.data?.message || error);
      toast.error("Failed to update guest");
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
          console.error(`Failed to delete guest:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting guest:", error?.response?.data?.message || error);
      toast.error("Failed to delete guest");
      return false;
    }
  },

  addBookingToHistory: async (guestId, bookingId) => {
    try {
      const guest = await guestService.getById(guestId);
      if (!guest) return null;
      
      const currentHistory = guest.booking_history_c || "";
      const historyArray = currentHistory ? currentHistory.split(',') : [];
      historyArray.push(bookingId.toString());
      const newHistory = historyArray.join(',');
      
      const updateData = {
        Id: parseInt(guestId),
        booking_history_c: newHistory
      };
      
      const params = { records: [updateData] };
      
      const response = await apperClient.updateRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update guest booking history:`, failed);
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error adding booking to history:", error?.response?.data?.message || error);
      return null;
    }
  }
};

export default guestService;

export default guestService;