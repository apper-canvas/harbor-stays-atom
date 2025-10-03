import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import RoomGrid from "@/components/organisms/RoomGrid";
import RoomDetailsModal from "@/components/organisms/RoomDetailsModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Badge from "@/components/atoms/Badge";
import roomService from "@/services/api/roomService";

const Rooms = ({ onMenuClick }) => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await roomService.getAll();
      setRooms(data);
      setFilteredRooms(data);
    } catch (err) {
      setError("Failed to load rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
if (statusFilter === "all") {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter(r => r.status_c === statusFilter));
    }
  }, [statusFilter, rooms]);

  const handleStatusChange = async (roomId, newStatus) => {
    try {
      await roomService.updateStatus(roomId, newStatus);
      await loadRooms();
      setSelectedRoom(null);
      toast.success(`Room status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update room status");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadRooms} />;

const statusCounts = {
    all: rooms.length,
    available: rooms.filter(r => r.status_c === "available").length,
    occupied: rooms.filter(r => r.status_c === "occupied").length,
    cleaning: rooms.filter(r => r.status_c === "cleaning").length,
    maintenance: rooms.filter(r => r.status_c === "maintenance").length
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header title="Rooms" onMenuClick={onMenuClick} />
      
      <div className="flex-1 p-4 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              statusFilter === "all"
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            All Rooms ({statusCounts.all})
          </button>
          <button
            onClick={() => setStatusFilter("available")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              statusFilter === "available"
                ? "bg-gradient-to-r from-success to-green-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Available ({statusCounts.available})
          </button>
          <button
            onClick={() => setStatusFilter("occupied")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              statusFilter === "occupied"
                ? "bg-gradient-to-r from-accent to-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Occupied ({statusCounts.occupied})
          </button>
          <button
            onClick={() => setStatusFilter("cleaning")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              statusFilter === "cleaning"
                ? "bg-gradient-to-r from-warning to-yellow-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Cleaning ({statusCounts.cleaning})
          </button>
          <button
            onClick={() => setStatusFilter("maintenance")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              statusFilter === "maintenance"
                ? "bg-gradient-to-r from-error to-red-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Maintenance ({statusCounts.maintenance})
          </button>
        </div>

        <RoomGrid 
          rooms={filteredRooms} 
          onRoomClick={setSelectedRoom}
        />
      </div>

      <RoomDetailsModal
        isOpen={!!selectedRoom}
        onClose={() => setSelectedRoom(null)}
        room={selectedRoom}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Rooms;