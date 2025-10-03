import transactionsData from "../mockData/transactions.json";

let transactions = [...transactionsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Revenue analytics methods
const getLast7DaysRevenue = async () => {
  await delay(300);
  
  const today = new Date();
  const last7Days = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayRevenue = transactions
      .filter(t => t.timestamp.startsWith(dateStr) && t.type === 'booking')
      .reduce((sum, t) => sum + t.amount, 0);
    
    last7Days.push({
      date: dateStr,
      revenue: dayRevenue
    });
  }
  
  return last7Days;
};

const getTotalRevenue = async () => {
  await delay(200);
  return transactions
    .filter(t => t.type === 'booking')
    .reduce((sum, t) => sum + t.amount, 0);
};

const getAverageDailyRate = async () => {
  await delay(200);
  const bookingTransactions = transactions.filter(t => t.type === 'booking');
  if (bookingTransactions.length === 0) return 0;
  
  const total = bookingTransactions.reduce((sum, t) => sum + t.amount, 0);
  return Math.round(total / bookingTransactions.length);
};

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

  getTotalRevenue,

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
  },

  getLast7DaysRevenue,
  getAverageDailyRate
};

export default transactionService;