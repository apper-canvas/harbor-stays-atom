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
  },

  getRecentActivity: async () => {
    await delay(300);
    
    const activities = [];
    const now = new Date();
    
    bookings.forEach(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      
      // Check-in activities (past 7 days)
      if (checkIn <= now && checkIn >= new Date(now - 7 * 24 * 60 * 60 * 1000)) {
        activities.push({
          Id: `checkin-${booking.Id}`,
          type: 'checkin',
          booking: booking,
          timestamp: booking.checkIn,
          description: `${booking.guestName} checked in to Room ${booking.roomNumber}`
        });
      }
      
      // Check-out activities (past 7 days)
      if (checkOut <= now && checkOut >= new Date(now - 7 * 24 * 60 * 60 * 1000)) {
        activities.push({
          Id: `checkout-${booking.Id}`,
          type: 'checkout',
          booking: booking,
          timestamp: booking.checkOut,
          description: `${booking.guestName} checked out from Room ${booking.roomNumber}`
        });
      }
      
      // New booking activities (created in past 7 days - using checkIn as proxy)
      if (booking.status === 'confirmed' && checkIn > now) {
        activities.push({
          Id: `new-${booking.Id}`,
          type: 'new_booking',
          booking: booking,
          timestamp: booking.checkIn,
          description: `New booking created for ${booking.guestName}`
        });
      }
    });
    
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  },

  getUpcomingBookings: async () => {
    await delay(300);
    const now = new Date();
    
    return bookings
      .filter(b => new Date(b.checkIn) > now)
      .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn))
      .slice(0, 10);
  }
};

export default bookingService;