import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import Header from "@/components/organisms/Header";
import StatCard from "@/components/molecules/StatCard";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import roomService from "@/services/api/roomService";
import bookingService from "@/services/api/bookingService";
import transactionService from "@/services/api/transactionService";

const Reports = ({ onMenuClick }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statistics, setStatistics] = useState(null);
  const [revenue, setRevenue] = useState(0);
  const [bookings, setBookings] = useState([]);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");
      const [stats, totalRevenue, allBookings] = await Promise.all([
        roomService.getStatistics(),
        transactionService.getTotalRevenue(),
        bookingService.getAll()
      ]);
      setStatistics(stats);
      setRevenue(totalRevenue);
      setBookings(allBookings);
    } catch (err) {
      setError("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadReports} />;

  const occupancyChartOptions = {
    chart: {
      type: "donut",
      toolbar: { show: false }
    },
    labels: ["Occupied", "Available", "Cleaning", "Maintenance"],
    colors: ["#2563eb", "#059669", "#d97706", "#dc2626"],
    legend: {
      position: "bottom"
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%"
        }
      }
    }
  };

  const occupancyChartSeries = [
    statistics.occupied,
    statistics.available,
    statistics.cleaning,
    statistics.maintenance
  ];

const bookingStatusData = {
    confirmed: bookings.filter(b => b.status_c === "confirmed").length,
    checkedIn: bookings.filter(b => b.status_c === "checked-in").length,
    checkedOut: bookings.filter(b => b.status_c === "checked-out").length,
    cancelled: bookings.filter(b => b.status_c === "cancelled").length
  };

  const bookingChartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: ["Confirmed", "Checked In", "Checked Out", "Cancelled"]
    },
    colors: ["#2563eb"],
    fill: {
      opacity: 1
    }
  };

  const bookingChartSeries = [{
    name: "Bookings",
    data: [
      bookingStatusData.confirmed,
      bookingStatusData.checkedIn,
      bookingStatusData.checkedOut,
      bookingStatusData.cancelled
    ]
  }];

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Header title="Reports & Analytics" onMenuClick={onMenuClick} />
      
      <div className="flex-1 p-4 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={`$${revenue.toLocaleString()}`}
            icon="DollarSign"
            color="secondary"
            trend="up"
            trendValue="+12.5%"
          />
          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon="Calendar"
            color="accent"
          />
          <StatCard
            title="Occupancy Rate"
            value={`${statistics.occupancyRate}%`}
            icon="TrendingUp"
            color="success"
            trend="up"
            trendValue="+5.2%"
          />
          <StatCard
            title="Average Rate"
            value={`$${Math.round(revenue / bookings.length)}`}
            icon="DollarSign"
            color="info"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Room Status Distribution</h3>
            <ReactApexChart
              options={occupancyChartOptions}
              series={occupancyChartSeries}
              type="donut"
              height={350}
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Booking Status Overview</h3>
            <ReactApexChart
              options={bookingChartOptions}
              series={bookingChartSeries}
              type="bar"
              height={350}
            />
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Key Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Rooms</p>
              <p className="text-3xl font-bold text-primary">{statistics.total}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Occupied Rooms</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">
                {statistics.occupied}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Available Rooms</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-success to-green-600 bg-clip-text text-transparent">
                {statistics.available}
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">In Maintenance</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-warning to-yellow-600 bg-clip-text text-transparent">
                {statistics.maintenance}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;