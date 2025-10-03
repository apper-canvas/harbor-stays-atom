import React from "react";
import StatCard from "@/components/molecules/StatCard";

const DashboardStats = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Rooms"
        value={statistics.total}
        icon="Home"
        color="accent"
      />
      <StatCard
        title="Occupied"
        value={statistics.occupied}
        icon="Users"
        color="success"
      />
      <StatCard
        title="Available"
        value={statistics.available}
        icon="CheckCircle"
        color="success"
      />
      <StatCard
        title="Occupancy Rate"
        value={`${statistics.occupancyRate}%`}
        icon="TrendingUp"
        color="secondary"
        trend="up"
        trendValue="+5.2%"
      />
    </div>
  );
};

export default DashboardStats;