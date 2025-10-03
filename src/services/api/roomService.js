import { toast } from "react-toastify";

const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = "room_c";

const roomService = {
  getAll: async () => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "room_number_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "floor_c"}},
          {"field": {"Name": "capacity_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "base_rate_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "last_cleaned_c"}},
          {"field": {"Name": "notes_c"}}
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
      console.error("Error fetching rooms:", error?.response?.data?.message || error);
      toast.error("Failed to load rooms");
      return [];
    }
  },

  getById: async (id) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "room_number_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "floor_c"}},
          {"field": {"Name": "capacity_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "base_rate_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "last_cleaned_c"}},
          {"field": {"Name": "notes_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching room ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  getByStatus: async (status) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "room_number_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "floor_c"}},
          {"field": {"Name": "capacity_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "base_rate_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "last_cleaned_c"}},
          {"field": {"Name": "notes_c"}}
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
      console.error("Error fetching rooms by status:", error?.response?.data?.message || error);
      return [];
    }
  },

  getByFloor: async (floor) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "room_number_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "floor_c"}},
          {"field": {"Name": "capacity_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "base_rate_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "last_cleaned_c"}},
          {"field": {"Name": "notes_c"}}
        ],
        where: [{"FieldName": "floor_c", "Operator": "EqualTo", "Values": [parseInt(floor)]}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching rooms by floor:", error?.response?.data?.message || error);
      return [];
    }
  },

  create: async (room) => {
    try {
      const params = {
        records: [{
          Name: room.Name || room.room_number_c || "New Room",
          room_number_c: room.room_number_c,
          type_c: room.type_c,
          floor_c: parseInt(room.floor_c),
          capacity_c: parseInt(room.capacity_c),
          amenities_c: room.amenities_c,
          base_rate_c: parseFloat(room.base_rate_c),
          status_c: room.status_c || "available",
          last_cleaned_c: room.last_cleaned_c || new Date().toISOString(),
          notes_c: room.notes_c || ""
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
          console.error(`Failed to create room:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating room:", error?.response?.data?.message || error);
      toast.error("Failed to create room");
      return null;
    }
  },

  update: async (id, data) => {
    try {
      const updateData = {
        Id: parseInt(id)
      };
      
      if (data.Name !== undefined) updateData.Name = data.Name;
      if (data.room_number_c !== undefined) updateData.room_number_c = data.room_number_c;
      if (data.type_c !== undefined) updateData.type_c = data.type_c;
      if (data.floor_c !== undefined) updateData.floor_c = parseInt(data.floor_c);
      if (data.capacity_c !== undefined) updateData.capacity_c = parseInt(data.capacity_c);
      if (data.amenities_c !== undefined) updateData.amenities_c = data.amenities_c;
      if (data.base_rate_c !== undefined) updateData.base_rate_c = parseFloat(data.base_rate_c);
      if (data.status_c !== undefined) updateData.status_c = data.status_c;
      if (data.last_cleaned_c !== undefined) updateData.last_cleaned_c = data.last_cleaned_c;
      if (data.notes_c !== undefined) updateData.notes_c = data.notes_c;
      
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
          console.error(`Failed to update room:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating room:", error?.response?.data?.message || error);
      toast.error("Failed to update room");
      return null;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const updateData = {
        Id: parseInt(id),
        status_c: status
      };
      
      if (status === "available") {
        updateData.last_cleaned_c = new Date().toISOString();
      }
      
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
          console.error(`Failed to update room status:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating room status:", error?.response?.data?.message || error);
      toast.error("Failed to update room status");
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
          console.error(`Failed to delete room:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting room:", error?.response?.data?.message || error);
      toast.error("Failed to delete room");
      return false;
    }
  },

  getStatistics: async () => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "status_c"}}
        ]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return {
          total: 0,
          occupied: 0,
          available: 0,
          cleaning: 0,
          maintenance: 0,
          occupancyRate: 0
        };
      }
      
      const rooms = response.data || [];
      const total = rooms.length;
      const occupied = rooms.filter(r => r.status_c === "occupied").length;
      const available = rooms.filter(r => r.status_c === "available").length;
      const cleaning = rooms.filter(r => r.status_c === "cleaning").length;
      const maintenance = rooms.filter(r => r.status_c === "maintenance").length;

      return {
        total,
        occupied,
        available,
        cleaning,
        maintenance,
        occupancyRate: total > 0 ? ((occupied / total) * 100).toFixed(1) : 0
      };
    } catch (error) {
      console.error("Error fetching room statistics:", error?.response?.data?.message || error);
      return {
        total: 0,
        occupied: 0,
        available: 0,
        cleaning: 0,
        maintenance: 0,
        occupancyRate: 0
      };
    }
  }
};

export default roomService;

export default roomService;