import guestsData from "../mockData/guests.json";

let guests = [...guestsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const guestService = {
  getAll: async () => {
    await delay(300);
    return [...guests];
  },

  getById: async (id) => {
    await delay(200);
    const guest = guests.find(g => g.Id === parseInt(id));
    return guest ? { ...guest } : null;
  },

  search: async (query) => {
    await delay(300);
    const lowerQuery = query.toLowerCase();
    return guests.filter(g => 
      g.firstName.toLowerCase().includes(lowerQuery) ||
      g.lastName.toLowerCase().includes(lowerQuery) ||
      g.email.toLowerCase().includes(lowerQuery) ||
      g.phone.includes(query)
    ).map(g => ({ ...g }));
  },

  getVIPGuests: async () => {
    await delay(300);
    return guests.filter(g => g.vipStatus).map(g => ({ ...g }));
  },

  create: async (guest) => {
    await delay(400);
    const maxId = Math.max(...guests.map(g => g.Id), 0);
    const newGuest = {
      ...guest,
      Id: maxId + 1,
      bookingHistory: []
    };
    guests.push(newGuest);
    return { ...newGuest };
  },

  update: async (id, data) => {
    await delay(400);
    const index = guests.findIndex(g => g.Id === parseInt(id));
    if (index !== -1) {
      guests[index] = { ...guests[index], ...data };
      return { ...guests[index] };
    }
    return null;
  },

  delete: async (id) => {
    await delay(400);
    const index = guests.findIndex(g => g.Id === parseInt(id));
    if (index !== -1) {
      guests.splice(index, 1);
      return true;
    }
    return false;
  },

  addBookingToHistory: async (guestId, bookingId) => {
    await delay(200);
    const index = guests.findIndex(g => g.Id === parseInt(guestId));
    if (index !== -1) {
      guests[index].bookingHistory = [...guests[index].bookingHistory, bookingId];
      return { ...guests[index] };
    }
    return null;
  }
};

export default guestService;