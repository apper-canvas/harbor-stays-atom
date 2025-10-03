import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import ReactApexChart from "react-apexcharts";

const RevenueOverview = ({ revenueData }) => {
  const { last7Days, total, avgDailyRate, bookingCount } = revenueData;

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 280,
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, system-ui, sans-serif'
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
        distributed: false
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#2563eb'],
    xaxis: {
      categories: last7Days.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      }),
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#64748b',
          fontSize: '12px'
        },
        formatter: (value) => `$${value}`
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) => `$${value}`
      }
    }
  };

  const series = [{
    name: 'Revenue',
    data: last7Days.map(d => d.revenue)
  }];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Revenue Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">Last 7 days performance</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-accent to-blue-600">
          <ApperIcon name="DollarSign" size={24} className="text-white" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">${total}</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Avg Daily Rate</p>
          <p className="text-2xl font-bold text-gray-800">${avgDailyRate}</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Bookings</p>
          <p className="text-2xl font-bold text-gray-800">{bookingCount}</p>
        </div>
      </div>

      <ReactApexChart
        options={chartOptions}
        series={series}
        type="bar"
        height={280}
      />
    </Card>
  );
};

export default RevenueOverview;