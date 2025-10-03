import roomsData from "../mockData/rooms.json";

let rooms = [...roomsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const roomService = {
  getAll: async () => {
    await delay(300);
    return [...rooms];
  },

  getById: async (id) => {
    await delay(200);
    const room = rooms.find(r => r.Id === parseInt(id));
    return room ? { ...room } : null;
  },

  getByStatus: async (status) => {
    await delay(300);
    return rooms.filter(r => r.status === status).map(r => ({ ...r }));
  },

  getByFloor: async (floor) => {
    await delay(300);
    return rooms.filter(r => r.floor === floor).map(r => ({ ...r }));
  },

  create: async (room) => {
    await delay(400);
    const maxId = Math.max(...rooms.map(r => r.Id), 0);
    const newRoom = {
      ...room,
      Id: maxId + 1,
      lastCleaned: new Date().toISOString()
    };
    rooms.push(newRoom);
    return { ...newRoom };
  },

  update: async (id, data) => {
    await delay(400);
    const index = rooms.findIndex(r => r.Id === parseInt(id));
    if (index !== -1) {
      rooms[index] = { ...rooms[index], ...data };
      return { ...rooms[index] };
    }
    return null;
  },

  updateStatus: async (id, status) => {
    await delay(300);
    const index = rooms.findIndex(r => r.Id === parseInt(id));
    if (index !== -1) {
      rooms[index] = { 
        ...rooms[index], 
        status,
        lastCleaned: status === "available" ? new Date().toISOString() : rooms[index].lastCleaned
      };
      return { ...rooms[index] };
    }
    return null;
  },

  delete: async (id) => {
    await delay(400);
    const index = rooms.findIndex(r => r.Id === parseInt(id));
    if (index !== -1) {
      rooms.splice(index, 1);
      return true;
    }
    return false;
  },

  getStatistics: async () => {
    await delay(300);
    const total = rooms.length;
    const occupied = rooms.filter(r => r.status === "occupied").length;
    const available = rooms.filter(r => r.status === "available").length;
    const cleaning = rooms.filter(r => r.status === "cleaning").length;
    const maintenance = rooms.filter(r => r.status === "maintenance").length;

    return {
      total,
      occupied,
      available,
      cleaning,
      maintenance,
      occupancyRate: total > 0 ? ((occupied / total) * 100).toFixed(1) : 0
    };
  }
};

export default roomService;