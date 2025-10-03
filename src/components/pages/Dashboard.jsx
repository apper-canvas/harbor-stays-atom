import React, { useState, useEffect } from "react";
import Header from "@/components/organisms/Header";
import DashboardStats from "@/components/organisms/DashboardStats";
import TodayOperations from "@/components/organisms/TodayOperations";
import RevenueOverview from "@/components/organisms/RevenueOverview";
import UpcomingBookingsList from "@/components/organisms/UpcomingBookingsList";
import RecentActivityFeed from "@/components/organisms/RecentActivityFeed";
import QuickActionsBar from "@/components/organisms/QuickActionsBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import roomService from "@/services/api/roomService";
import bookingService from "@/services/api/bookingService";
import guestService from "@/services/api/guestService";
import transactionService from "@/services/api/transactionService";
const Dashboard = ({ onMenuClick }) => {
  const [statistics, setStatistics] = useState(null);
const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [revenueData, setRevenueData] = useState({ last7Days: [], total: 0, avgDailyRate: 0, bookingCount: 0 });
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsData, arrivalsData, departuresData, guestsData, roomsData, last7DaysRevenue, totalRevenue, avgDailyRate, upcomingData, activitiesData] = await Promise.all([
        roomService.getStatistics(),
        bookingService.getTodayArrivals(),
        bookingService.getTodayDepartures(),
        guestService.getAll(),
        roomService.getAll(),
        transactionService.getLast7DaysRevenue(),
        transactionService.getTotalRevenue(),
        transactionService.getAverageDailyRate(),
        bookingService.getUpcomingBookings(),
        bookingService.getRecentActivity()
      ]);

      setStatistics(statsData);
      setArrivals(arrivalsData);
      setDepartures(departuresData);
      setGuests(guestsData);
      setRooms(roomsData);
      setRevenueData({
        last7Days: last7DaysRevenue,
        total: totalRevenue,
        avgDailyRate: avgDailyRate,
        bookingCount: arrivalsData.length + departuresData.length
      });
      setUpcomingBookings(upcomingData);
      setRecentActivities(activitiesData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header 
        title="Dashboard" 
        onMenuClick={onMenuClick}
      />
      
<div className="flex-1 p-4 lg:p-8 space-y-6">
        <DashboardStats statistics={statistics} />
        <RevenueOverview revenueData={revenueData} />
        <QuickActionsBar />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingBookingsList bookings={upcomingBookings} />
          <RecentActivityFeed activities={recentActivities} />
        </div>
        <TodayOperations 
          arrivals={arrivals} 
          departures={departures}
          guests={guests}
          rooms={rooms}
        />
      </div>
    </div>
  );
};

export default Dashboard;