import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import BookingListItem from "@/components/molecules/BookingListItem";
import BookingModal from "@/components/organisms/BookingModal";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import bookingService from "@/services/api/bookingService";
import guestService from "@/services/api/guestService";
import roomService from "@/services/api/roomService";

const Bookings = ({ onMenuClick }) => {
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [bookingsData, guestsData, roomsData] = await Promise.all([
        bookingService.getAll(),
        guestService.getAll(),
        roomService.getAll()
      ]);
      setBookings(bookingsData);
      setGuests(guestsData);
      setRooms(roomsData);
      setFilteredBookings(bookingsData);
    } catch (err) {
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    if (statusFilter !== "all") {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(b => {
        const guest = guests.find(g => g.Id === b.guestId);
        const room = rooms.find(r => r.Id === b.roomId);
        return (
          guest?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room?.roomNumber.includes(searchQuery)
        );
      });
    }

    setFilteredBookings(filtered);
  }, [statusFilter, searchQuery, bookings, guests, rooms]);

  const handleCreateBooking = async (bookingData) => {
    try {
      await bookingService.create(bookingData);
      await roomService.updateStatus(bookingData.roomId, "occupied");
      await loadData();
      setShowModal(false);
      toast.success("Booking created successfully!");
    } catch (err) {
      toast.error("Failed to create booking");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const statusCounts = {
    all: bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    "checked-in": bookings.filter(b => b.status === "checked-in").length,
    "checked-out": bookings.filter(b => b.status === "checked-out").length
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header 
        title="Bookings" 
        onMenuClick={onMenuClick}
        action={{
          label: "New Booking",
          icon: "Plus",
          onClick: () => setShowModal(true)
        }}
      />
      
      <div className="flex-1 p-4 lg:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by guest name or room number..."
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                statusFilter === "all"
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              All ({statusCounts.all})
            </button>
            <button
              onClick={() => setStatusFilter("confirmed")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                statusFilter === "confirmed"
                  ? "bg-gradient-to-r from-info to-cyan-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Confirmed ({statusCounts.confirmed})
            </button>
            <button
              onClick={() => setStatusFilter("checked-in")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                statusFilter === "checked-in"
                  ? "bg-gradient-to-r from-success to-green-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Checked-in ({statusCounts["checked-in"]})
            </button>
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <Empty
            message="No bookings found"
            description="Create your first booking to get started"
            actionLabel="New Booking"
            onAction={() => setShowModal(true)}
            icon="Calendar"
          />
        ) : (
          <div className="space-y-3">
            {filteredBookings.map(booking => (
              <BookingListItem
                key={booking.Id}
                booking={booking}
                guest={guests.find(g => g.Id === booking.guestId)}
                room={rooms.find(r => r.Id === booking.roomId)}
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>

      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateBooking}
        guests={guests}
        rooms={rooms}
      />
    </div>
  );
};

export default Bookings;