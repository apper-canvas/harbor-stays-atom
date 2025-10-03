import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import { formatDistanceToNow } from "date-fns";

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'checkin':
        return 'UserCheck';
      case 'checkout':
        return 'UserMinus';
      case 'new_booking':
        return 'Plus';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'checkin':
        return 'from-success to-green-600';
      case 'checkout':
        return 'from-warning to-yellow-600';
      case 'new_booking':
        return 'from-accent to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (activities.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Recent Activity
          </h2>
          <div className="p-3 rounded-lg bg-gradient-to-br from-warning to-yellow-600">
            <ApperIcon name="Activity" size={24} className="text-white" />
          </div>
        </div>
        <Empty message="No recent activities" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Recent Activity
          </h2>
          <p className="text-sm text-gray-500 mt-1">Latest updates</p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-warning to-yellow-600">
          <ApperIcon name="Activity" size={24} className="text-white" />
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map(activity => (
          <div
            key={activity.Id}
            className="flex items-start space-x-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className={`p-2 rounded-full bg-gradient-to-br ${getActivityColor(activity.type)} flex-shrink-0`}>
              <ApperIcon name={getActivityIcon(activity.type)} size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800 font-medium">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivityFeed;