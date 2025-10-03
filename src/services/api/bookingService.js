import bookingsData from "../mockData/bookings.json";

let bookings = [...bookingsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const bookingService = {
  getAll: async () => {
    await delay(300);
    return [...bookings];
  },

  getById: async (id) => {
    await delay(200);
    const booking = bookings.find(b => b.Id === parseInt(id));
    return booking ? { ...booking } : null;
  },

  getByStatus: async (status) => {
    await delay(300);
    return bookings.filter(b => b.status === status).map(b => ({ ...b }));
  },

  getByGuest: async (guestId) => {
    await delay(300);
    return bookings.filter(b => b.guestId === parseInt(guestId)).map(b => ({ ...b }));
  },

  getByDateRange: async (startDate, endDate) => {
    await delay(300);
    return bookings.filter(b => {
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (checkIn >= start && checkIn <= end) || (checkOut >= start && checkOut <= end);
    }).map(b => ({ ...b }));
  },

  getTodayArrivals: async () => {
    await delay(300);
    const today = new Date().toISOString().split("T")[0];
    return bookings.filter(b => b.checkIn === today && b.status === "confirmed").map(b => ({ ...b }));
  },

  getTodayDepartures: async () => {
    await delay(300);
    const today = new Date().toISOString().split("T")[0];
    return bookings.filter(b => b.checkOut === today && b.status === "checked-in").map(b => ({ ...b }));
  },

  create: async (booking) => {
    await delay(400);
    const maxId = Math.max(...bookings.map(b => b.Id), 0);
    const newBooking = {
      ...booking,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      status: "confirmed"
    };
    bookings.push(newBooking);
    return { ...newBooking };
  },

  update: async (id, data) => {
    await delay(400);
    const index = bookings.findIndex(b => b.Id === parseInt(id));
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...data };
      return { ...bookings[index] };
    }
    return null;
  },

  updateStatus: async (id, status) => {
    await delay(300);
    const index = bookings.findIndex(b => b.Id === parseInt(id));
    if (index !== -1) {
      bookings[index] = { ...bookings[index], status };
      return { ...bookings[index] };
    }
    return null;
  },

  delete: async (id) => {
    await delay(400);
    const index = bookings.findIndex(b => b.Id === parseInt(id));
    if (index !== -1) {
      bookings.splice(index, 1);
      return true;
    }
    return false;
  },

  checkIn: async (id) => {
    return await bookingService.updateStatus(id, "checked-in");
  },

  checkOut: async (id) => {
    return await bookingService.updateStatus(id, "checked-out");
  },

  cancel: async (id) => {
    return await bookingService.updateStatus(id, "cancelled");
  }
};

export default bookingService;