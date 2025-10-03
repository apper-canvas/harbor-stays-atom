import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import GuestCard from "@/components/molecules/GuestCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import guestService from "@/services/api/guestService";

const Guests = ({ onMenuClick }) => {
  const [guests, setGuests] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [vipFilter, setVipFilter] = useState(false);

  const loadGuests = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await guestService.getAll();
      setGuests(data);
      setFilteredGuests(data);
    } catch (err) {
      setError("Failed to load guests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  useEffect(() => {
    let filtered = guests;

    if (vipFilter) {
filtered = filtered.filter(g => g.vip_status_c);
    }

    if (searchQuery) {
      filtered = filtered.filter(g =>
        g.first_name_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.last_name_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.email_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.phone_c?.includes(searchQuery)
      );
    }

    setFilteredGuests(filtered);
  }, [searchQuery, vipFilter, guests]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadGuests} />;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header title="Guests" onMenuClick={onMenuClick} />
      
      <div className="flex-1 p-4 lg:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search guests by name, email, or phone..."
            />
          </div>
          <button
            onClick={() => setVipFilter(!vipFilter)}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              vipFilter
                ? "bg-gradient-to-r from-secondary to-yellow-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            VIP Guests Only
          </button>
        </div>

        {filteredGuests.length === 0 ? (
          <Empty
            message="No guests found"
            description="No guests match your search criteria"
            icon="Users"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuests.map(guest => (
              <GuestCard
                key={guest.Id}
                guest={guest}
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Guests;