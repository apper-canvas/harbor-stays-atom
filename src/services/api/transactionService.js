import transactionsData from "../mockData/transactions.json";

let transactions = [...transactionsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const transactionService = {
  getAll: async () => {
    await delay(300);
    return [...transactions];
  },

  getById: async (id) => {
    await delay(200);
    const transaction = transactions.find(t => t.Id === parseInt(id));
    return transaction ? { ...transaction } : null;
  },

  getByBooking: async (bookingId) => {
    await delay(300);
    return transactions.filter(t => t.bookingId === parseInt(bookingId)).map(t => ({ ...t }));
  },

  getByType: async (type) => {
    await delay(300);
    return transactions.filter(t => t.type === type).map(t => ({ ...t }));
  },

  create: async (transaction) => {
    await delay(400);
    const maxId = Math.max(...transactions.map(t => t.Id), 0);
    const newTransaction = {
      ...transaction,
      Id: maxId + 1,
      timestamp: new Date().toISOString()
    };
    transactions.push(newTransaction);
    return { ...newTransaction };
  },

  getTotalRevenue: async () => {
    await delay(300);
    return transactions
      .filter(t => t.type === "booking")
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getRevenueByDateRange: async (startDate, endDate) => {
    await delay(300);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return transactions
      .filter(t => {
        const tDate = new Date(t.timestamp);
        return tDate >= start && tDate <= end;
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }
};

export default transactionService;