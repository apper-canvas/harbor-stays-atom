import { toast } from "react-toastify";

const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = "transaction_c";

const getLast7DaysRevenue = async () => {
  try {
    const today = new Date();
    const last7Days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "timestamp_c"}}
        ],
        where: [
          {"FieldName": "timestamp_c", "Operator": "StartsWith", "Values": [dateStr]},
          {"FieldName": "type_c", "Operator": "EqualTo", "Values": ["booking"]}
        ]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (response.success && response.data) {
        const dayRevenue = response.data.reduce((sum, t) => sum + (t.amount_c || 0), 0);
        last7Days.push({
          date: dateStr,
          revenue: dayRevenue
        });
      } else {
        last7Days.push({
          date: dateStr,
          revenue: 0
        });
      }
    }
    
    return last7Days;
  } catch (error) {
    console.error("Error fetching last 7 days revenue:", error?.response?.data?.message || error);
    return Array(7).fill({ date: "", revenue: 0 });
  }
};

const getTotalRevenue = async () => {
  try {
    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "amount_c"}},
        {"field": {"Name": "type_c"}}
      ],
      where: [{"FieldName": "type_c", "Operator": "EqualTo", "Values": ["booking"]}]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    
    if (!response.success) {
      console.error(response.message);
      return 0;
    }
    
    const transactions = response.data || [];
    return transactions.reduce((sum, t) => sum + (t.amount_c || 0), 0);
  } catch (error) {
    console.error("Error fetching total revenue:", error?.response?.data?.message || error);
    return 0;
  }
};

const getAverageDailyRate = async () => {
  try {
    const params = {
      fields: [
        {"field": {"Name": "Id"}},
        {"field": {"Name": "amount_c"}},
        {"field": {"Name": "type_c"}}
      ],
      where: [{"FieldName": "type_c", "Operator": "EqualTo", "Values": ["booking"]}]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    
    if (!response.success) {
      console.error(response.message);
      return 0;
    }
    
    const bookingTransactions = response.data || [];
    if (bookingTransactions.length === 0) return 0;
    
    const total = bookingTransactions.reduce((sum, t) => sum + (t.amount_c || 0), 0);
    return Math.round(total / bookingTransactions.length);
  } catch (error) {
    console.error("Error fetching average daily rate:", error?.response?.data?.message || error);
    return 0;
  }
};

const transactionService = {
  getAll: async () => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "booking_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "method_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "description_c"}}
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
      console.error("Error fetching transactions:", error?.response?.data?.message || error);
      toast.error("Failed to load transactions");
      return [];
    }
  },

  getById: async (id) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "booking_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "method_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "description_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  getByBooking: async (bookingId) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "booking_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "method_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "description_c"}}
        ],
        where: [{"FieldName": "booking_id_c", "Operator": "EqualTo", "Values": [parseInt(bookingId)]}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching transactions by booking:", error?.response?.data?.message || error);
      return [];
    }
  },

  getByType: async (type) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "booking_id_c"}, "referenceField": {"field": {"Name": "Name"}}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "method_c"}},
          {"field": {"Name": "timestamp_c"}},
          {"field": {"Name": "description_c"}}
        ],
        where: [{"FieldName": "type_c", "Operator": "EqualTo", "Values": [type]}]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching transactions by type:", error?.response?.data?.message || error);
      return [];
    }
  },

  create: async (transaction) => {
    try {
      const params = {
        records: [{
          Name: transaction.Name || `Transaction - ${transaction.type_c}`,
          booking_id_c: transaction.booking_id_c ? parseInt(transaction.booking_id_c) : null,
          amount_c: parseFloat(transaction.amount_c),
          type_c: transaction.type_c,
          method_c: transaction.method_c,
          timestamp_c: transaction.timestamp_c || new Date().toISOString(),
          description_c: transaction.description_c || ""
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
          console.error(`Failed to create transaction:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating transaction:", error?.response?.data?.message || error);
      toast.error("Failed to create transaction");
      return null;
    }
  },

  getTotalRevenue,

  getRevenueByDateRange: async (startDate, endDate) => {
    try {
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "timestamp_c"}}
        ],
        where: [
          {"FieldName": "timestamp_c", "Operator": "GreaterThanOrEqualTo", "Values": [startDate]},
          {"FieldName": "timestamp_c", "Operator": "LessThanOrEqualTo", "Values": [endDate]}
        ]
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        return 0;
      }
      
      const transactions = response.data || [];
      return transactions.reduce((sum, t) => sum + (t.amount_c || 0), 0);
    } catch (error) {
      console.error("Error fetching revenue by date range:", error?.response?.data?.message || error);
      return 0;
    }
  },

  getLast7DaysRevenue,
  getAverageDailyRate
};

export default transactionService;